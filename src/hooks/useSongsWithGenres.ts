import { useEffect, useState } from 'react';
import { supabase } from '../api';
import { Song } from '../types';

// First, let's define a new type for our songs with genres
type SongWithGenres = Song & {
  genres: { name: string }[];
};

export async function getSongsWithGenres(): Promise<SongWithGenres[]> {
  const { data, error } = await supabase.from('Song').select(`
        *,
        genres:GenreSong(
          Genre(name)
        )
      `);

  if (error) throw new Error(`Failed to fetch songs - ${error.message}`);

  // Transform the data to match our SongWithGenres type
  const songsWithGenres = (data ?? []).map((song) => ({
    ...song,
    genres: song.genres.map((g: { Genre: { name: string } }) => ({
      name: g.Genre.name,
    })),
  }));

  return songsWithGenres;
}

export function useSongsWithGenres() {
  const [songs, setSongs] = useState<SongWithGenres[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSongsWithGenres()
      .then((data) => {
        setSongs(data);
      })
      .catch((err) => {
        console.warn(err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { songs, isLoading, error };
}
