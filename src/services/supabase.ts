import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://url.supabase.co';
const supabaseAnonKey = 'anonkey';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
