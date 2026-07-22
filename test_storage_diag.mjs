import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://opuavcxbgxlqyxnzzwem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWF2Y3hiZ3hscXl4bnp6d2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MjkzMjMsImV4cCI6MjEwMDIwNTMyM30.QXh_hnVgkcGyY95MdjMJn554lzyfx0GZuDHiTYq_XvA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function hr(title) {
  console.log('\n' + '═'.repeat(60));
  console.log('  ' + title);
  console.log('═'.repeat(60));
}

// ── 1. Verify bucket exists and is named exactly right ─────────────────────
async function checkBucketExists() {
  hr('1. LIST BUCKETS — verify payment-receipts exists');
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.log('listBuckets error:', error.message);
    console.log('(anon cannot list buckets — expected, not a problem)');
  } else {
    console.log('Buckets returned:', JSON.stringify(data, null, 2));
    const found = data?.find(b => b.id === 'payment-receipts');
    console.log(found
      ? `==> payment-receipts bucket found ✓ (public: ${found.public})`
      : '==> WARNING: payment-receipts bucket NOT found in list');
  }
}

// ── 2. Attempt upload and capture FULL response including status ────────────
async function uploadAndInspect() {
  hr('2. UPLOAD ATTEMPT — full response inspection');

  const receiptFilePath =
    'C:\\Users\\Administrator\\.gemini\\antigravity-ide\\brain\\c2da1090-d671-476d-9748-e3ce49fe8f0e\\sample_receipt_1784632288968.png';

  let fileBuffer;
  try {
    fileBuffer = readFileSync(receiptFilePath);
    console.log('File read OK:', fileBuffer.length, 'bytes');
  } catch (e) {
    console.log('Cannot read receipt file:', e.message);
    return null;
  }

  const fileName = `diag-${Date.now()}-receipt.png`;
  console.log('Uploading as:', fileName);

  const result = await supabase.storage
    .from('payment-receipts')
    .upload(fileName, fileBuffer, { contentType: 'image/png' });

  // Log everything the SDK returns
  console.log('\nFull SDK response:');
  console.log('  data  :', JSON.stringify(result.data));
  console.log('  error :', JSON.stringify(result.error));
  // status may not exist on storage responses — check
  console.log('  keys  :', Object.keys(result).join(', '));

  if (result.error) {
    console.log('\n==> UPLOAD FAILED ✗');
    console.log('    code   :', result.error.statusCode ?? result.error.code);
    console.log('    message:', result.error.message);
    return null;
  }

  if (!result.data?.path) {
    console.log('\n==> UPLOAD response has no path — may be a silent failure');
    return null;
  }

  console.log('\n==> UPLOAD REPORTED SUCCESS');
  console.log('    path:', result.data.path);
  return result.data.path;
}

// ── 3. List bucket contents to confirm file actually landed ────────────────
async function listBucketContents(uploadedPath) {
  hr('3. LIST bucket contents — confirm file exists with size');

  // anon might not have SELECT on storage.objects — try anyway
  const { data, error } = await supabase.storage
    .from('payment-receipts')
    .list('', { limit: 20, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    console.log('list() error:', error.message);
    console.log('(anon may not have storage list privilege — see Step 4)');
    return false;
  }

  if (!data || data.length === 0) {
    console.log('Bucket appears empty (or anon cannot list) — 0 items returned');
    return false;
  }

  console.log(`Items in bucket (${data.length} returned):`);
  for (const item of data) {
    console.log(`  - ${item.name}  |  size: ${item.metadata?.size ?? 'unknown'} bytes  |  created: ${item.created_at}`);
  }

  if (uploadedPath) {
    const found = data.find(f => f.name === uploadedPath || f.name.includes(uploadedPath));
    console.log(found
      ? `\n==> File confirmed in bucket ✓ (size: ${found.metadata?.size ?? 'unknown'} bytes)`
      : '\n==> WARNING: uploaded file NOT found in listing');
  }
  return true;
}

// ── 4. Try a tiny 1-byte upload to rule out size restrictions ─────────────
async function testTinyUpload() {
  hr('4. TINY UPLOAD TEST — rule out size/type policy blocks');
  const tiny = Buffer.from('x');
  const name = `tiny-${Date.now()}.txt`;

  const { data, error } = await supabase.storage
    .from('payment-receipts')
    .upload(name, tiny, { contentType: 'text/plain' });

  if (error) {
    console.log('Tiny upload error:', error.message, '|', error.statusCode ?? error.code);
    console.log('==> Upload IS being rejected — storage policy or bucket config issue');
  } else {
    console.log('Tiny upload succeeded. path:', data?.path);
    console.log('==> Anon CAN upload to bucket (size/type not the blocker)');
  }
}

// ── MAIN ───────────────────────────────────────────────────────────────────
async function main() {
  await checkBucketExists();
  const uploadedPath = await uploadAndInspect();
  await listBucketContents(uploadedPath);
  await testTinyUpload();

  console.log('\n' + '═'.repeat(60));
  console.log('  STORAGE DIAGNOSTICS COMPLETE');
  console.log('═'.repeat(60) + '\n');
}

main().catch(console.error);
