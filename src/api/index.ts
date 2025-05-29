import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

export * from './song';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseAnonKey
);
