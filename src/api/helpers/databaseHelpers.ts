import { supabase } from '..';
import { Song, SongWithGenres } from '../../types';

// Utility function for error handling
function handleError(error: unknown, message: string) {
  console.error(message, error);
  throw new Error(message);
}

export async function insertSong(songData: {
  title: string;
  artist: string;
  genre: string; // Required genre parameter
}): Promise<Song | null> {
  // Check if the genre exists first
  const genreId = await getGenreId(songData.genre);
  if (!genreId) {
    console.error(`Genre "${songData.genre}" not found. Song not inserted.`);
    return null; // Exit if genre doesn't exist
  }

  // Insert the song
  const { data, error } = await supabase
    .from('Song')
    .insert([{ title: songData.title, artist: songData.artist }])
    .select();

  if (error) {
    handleError(error, 'Error inserting song');
    return null;
  }

  const newSong = data[0];

  // Associate the song with the genre
  const success = await associateSongWithGenres(newSong.song_id, [genreId]);
  if (!success) {
    console.error(`Failed to associate song with "${songData.genre}" genre`);
    // We could delete the song here since genre association failed, but for now just warn
  }

  return newSong;
}

// Function to handle CSV upload of songs with a specific genre
export async function uploadSongsFromCSV(
  csvData: { title: string; artist: string }[],
  genre: string
): Promise<Song[]> {
  const successfulSongs: Song[] = [];

  for (const song of csvData) {
    try {
      const result = await insertSong({
        title: song.title,
        artist: song.artist,
        genre,
      });
      if (result) {
        successfulSongs.push(result);
      }
    } catch (error) {
      console.error(
        `Failed to insert song: ${song.title} - ${song.artist}`,
        error
      );
      continue;
    }
  }

  return successfulSongs;
}

export async function insertGenre(name: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('Genre')
    .insert({ name })
    .select();

  if (error) {
    handleError(error, 'Error inserting genre');
    return null;
  }

  return data[0]?.id || null;
}

export async function associateSongWithGenres(
  songId: number,
  genreIds: number[]
): Promise<boolean> {
  const associations = genreIds.map((genreId) => ({
    song_id: songId,
    genre_id: genreId,
  }));

  const { error } = await supabase.from('GenreSong').insert(associations);

  if (error) {
    handleError(error, 'Error associating song with genres');
    return false;
  }
  return true;
}

// Function to get genre ID by name
async function getGenreId(name: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('Genre')
    .select('id')
    .eq('name', name)
    .single();

  if (error) {
    handleError(error, 'Error fetching genre');
    return null;
  }

  return data?.id || null;
}

export async function getSongsByGenre(
  genreName: string | null
): Promise<SongWithGenres[]> {
  let query = supabase
    .from('Song')
    .select(
      `
        *,
        genres:GenreSong!inner(
          Genre!inner(
            name
          )
        )
      `
    )
    .order('artist');

  // If a genre is specified, add a filter condition
  if (genreName) {
    query = query.eq('genres.Genre.name', genreName);
  }

  const { data, error } = await query;

  if (error) {
    handleError(error, `Failed to fetch songs - ${error.message}`);
  }

  return (data ?? []).map((song) => ({
    ...song,
    genres: song.genres.map((g: { Genre: { name: string } }) => ({
      name: g.Genre.name,
    })),
  }));
}
