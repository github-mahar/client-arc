import { readFileSync } from 'fs';

// Raw HTTP upload — bypass the Supabase SDK entirely to see the real status code + body
const supabaseUrl = 'https://opuavcxbgxlqyxnzzwem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWF2Y3hiZ3hscXl4bnp6d2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MjkzMjMsImV4cCI6MjEwMDIwNTMyM30.QXh_hnVgkcGyY95MdjMJn554lzyfx0GZuDHiTYq_XvA';

const BUCKET = 'payment-receipts';
const receiptFilePath =
  'C:\\Users\\Administrator\\.gemini\\antigravity-ide\\brain\\c2da1090-d671-476d-9748-e3ce49fe8f0e\\sample_receipt_1784632288968.png';

async function rawUpload() {
  console.log('=== RAW HTTP UPLOAD — no SDK parsing ===\n');

  const fileBuffer = readFileSync(receiptFilePath);
  const fileName = `raw-http-test-${Date.now()}.png`;

  // Supabase Storage REST endpoint for upload
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET}/${fileName}`;

  console.log('POST', uploadUrl);
  console.log('File size:', fileBuffer.length, 'bytes');
  console.log('Auth: Bearer <anon_key>\n');

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'image/png',
      'apikey': supabaseAnonKey,
    },
    body: fileBuffer,
  });

  // Capture everything before parsing
  const rawStatus   = response.status;
  const rawStatusText = response.statusText;
  const rawHeaders  = Object.fromEntries(response.headers.entries());
  const rawBody     = await response.text();  // read raw before any JSON.parse

  console.log('─── RAW HTTP RESPONSE ───────────────────────────────');
  console.log('Status     :', rawStatus, rawStatusText);
  console.log('Headers    :');
  for (const [k, v] of Object.entries(rawHeaders)) {
    console.log(`  ${k}: ${v}`);
  }
  console.log('\nBody (raw text):');
  console.log(rawBody);

  // Try to parse as JSON for readability
  console.log('\n─── PARSED BODY ─────────────────────────────────────');
  try {
    const parsed = JSON.parse(rawBody);
    console.log(JSON.stringify(parsed, null, 2));
  } catch {
    console.log('(body is not valid JSON)');
  }

  console.log('\n─── VERDICT ─────────────────────────────────────────');
  if (rawStatus === 200 || rawStatus === 201) {
    console.log(`HTTP ${rawStatus} — server accepted the upload`);
    console.log('The file write is server-confirmed at the HTTP layer.');
  } else {
    console.log(`HTTP ${rawStatus} — server REJECTED the upload`);
    console.log('The SDK was returning fake success despite a server error.');
  }
}

rawUpload().catch(console.error);
