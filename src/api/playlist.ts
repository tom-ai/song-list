import { supabase } from '.';

export async function checkPlaylistExists(
  playlistId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('Playlist')
    .select('id')
    .eq('id', playlistId)
    .limit(1);

  if (error) throw new Error(`Error checking playlist -  ${error.message}`);

  const { id } = data[0];

  return id === playlistId;
}
