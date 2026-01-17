import { supabase } from '.';
import { Song } from '../types';

// use swr here, or just put in hook?
export async function getSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from('Song').select();
  if (error) throw new Error(`Failed to fetch songs - ${error.message}`);
  return data ?? [];
}