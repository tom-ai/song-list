import { useEffect, useState } from 'react';
import { Song } from './../types';
import { getSongs } from '../api';

export default function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSongs()
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
        setLoading(false);
      });
  }, []);

  return { songs, loading, error };
}
