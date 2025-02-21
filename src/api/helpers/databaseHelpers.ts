import { supabase } from '..';
import { Song, SongWithGenres } from '../../types';

export async function insertSong(songData: { title: string; artist: string }) {
  const { data, error } = await supabase
    .from('Song')
    .insert([songData])
    .select();

  if (error) {
    console.error('Error inserting song:', error);
    return null;
  }
  return data[0];
}

export async function insertGenre(name: string) {
  const { data, error } = await supabase
    .from('Genre')
    .insert({ name })
    .select();

  if (error) {
    console.error('Error inserting genre:', error);
    return null;
  }

  return data[0];
}

export async function associateSongWithGenres(
  songId: number,
  genreIds: number[]
) {
  const associations = genreIds.map((genreId) => ({
    song_id: songId,
    genre_id: genreId,
  }));

  const { error } = await supabase.from('GenreSong').insert(associations);

  if (error) {
    console.error('Error associating song with genres:', error);
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
    console.error('Error fetching genre:', error);
    return null;
  }

  return data?.id || null;
}

// Function to get all songs
async function getAllSongs(): Promise<Song[] | null> {
  const { data, error } = await supabase.from('Song').select('*');

  if (error) {
    console.error('Error fetching songs:', error);
    return null;
  }

  return data;
}

// Function to update all existing songs with Pop genre
export async function updateSongsWithPopGenre() {
  const popGenreId = await getGenreId('Pop');
  if (!popGenreId) {
    console.error('Pop genre not found');
    return false;
  }

  const songs = await getAllSongs();
  if (!songs) return false;

  const results = await Promise.all(
    songs.map((song) => associateSongWithGenres(song.song_id, [popGenreId]))
  );

  return results.every((result) => result === true);
}

// Function to insert new song with Classical genre
export async function insertClassicalSong(songData: {
  title: string;
  artist: string;
}) {
  const classicalGenreId = await getGenreId('Classical');
  if (!classicalGenreId) {
    console.error('Classical genre not found');
    return null;
  }

  const newSong = await insertSong(songData);
  if (!newSong) return null;

  const success = await associateSongWithGenres(newSong.song_id, [
    classicalGenreId,
  ]);
  if (!success) {
    console.error('Failed to associate song with Classical genre');
    return null;
  }

  return newSong;
}

// Function to handle CSV upload of classical songs
export async function uploadClassicalSongsFromCSV(
  csvData: { title: string; artist: string }[]
) {
  const results = await Promise.all(
    csvData.map((song) =>
      insertClassicalSong({
        title: song.title,
        artist: song.artist,
      })
    )
  );

  return results.filter((result) => result !== null);
}

export async function getSongsByGenre(
  genreName: string | null
): Promise<SongWithGenres[]> {
  let query = supabase.from('Song').select(`
        *,
        genres:GenreSong!inner(
          Genre!inner(
            name
          )
        )
      `);

  // If a genre is specified, add a filter condition
  if (genreName) {
    query = query.eq('genres.Genre.name', genreName);
  }

  const { data, error } = await query;

  if (error) throw new Error(`Failed to fetch songs - ${error.message}`);

  return (data ?? []).map((song) => ({
    ...song,
    genres: song.genres.map((g: { Genre: { name: string } }) => ({
      name: g.Genre.name,
    })),
  }));
}
