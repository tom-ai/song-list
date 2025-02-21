import { supabase } from '.';
import { Song } from '../types';

export async function getSongs(): Promise<Song[]> {
  const { data, error } = await supabase.from('Song').select();
  if (error) throw new Error(`Failed to fetch songs - ${error.message}`);
  return data ?? [];
}

// export async function addSong(playlistId: string, songId: number) {
//   const { data, error } = await supabase.from('PlaylistSong').insert({
//     song_id: songId,
//     playlist_id: playlistId,
//     added_at: new Date().toISOString(),
//   });

//   if (error)
//     throw new Error(`Failed to add song to playlist - ${error.message}`);

//   console.log(data);
// }
