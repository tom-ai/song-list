import { useEffect, useState } from 'react';
import { Song } from './../types';
import { supabase } from '.';

export default function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('Song').select();
      if (error) throw error;
      setSongs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { songs, isLoading, error };
}
