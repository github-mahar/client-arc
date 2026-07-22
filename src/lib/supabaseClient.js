import { createClient } from '@supabase/supabase-js';

const supabaseUrlRef = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Handle both standard URLs and project reference IDs in env config
const supabaseUrl = supabaseUrlRef.startsWith('http')
  ? supabaseUrlRef
  : `https://${supabaseUrlRef}.supabase.co`;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
