import type { Database } from './../types/supabase';

export type Song = Database['public']['Tables']['Song']['Row'];
export type Playlist = Database['public']['Tables']['Playlist']['Row'];
export type PlaylistSong = Database['public']['Tables']['PlaylistSong']['Row'];
