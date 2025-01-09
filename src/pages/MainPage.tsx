import SongList from '../components/SongList';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import { filterSongs } from '../utils/songHelpers';
import { useDebouncedSetParams } from '../hooks/useDebouncedSetParams';
import { createClient } from '@supabase/supabase-js';
import { Song } from './../types';

const supabase = createClient(
  'https://yaqgpshbigfdzihldrgw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcWdwc2hiaWdmZHppaGxkcmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTk0NzgsImV4cCI6MjA1MTk5NTQ3OH0.xtkfhfC9OZJlZfc5L81TkTg8N9jC941b1_ll7B4hS74'
);

export default function MainPage() {
  const [params, setParams] = useSearchParams({});

  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  const debouncedSetParams = useDebouncedSetParams(setParams, 500);

  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    const { data } = await supabase.from('Song').select();

    if (data) {
      setSongs(data);
    }
  }

  return (
    <section>
      <SearchBox
        value={inputValue}
        onChange={(value) => {
          setInputValue(value);
          debouncedSetParams(value);
        }}
      />
      {q !== '' && songs.length === 0 ? (
        <p>No songs found matching "{inputValue}"</p>
      ) : (
        <SongList
          songs={songs.filter((song) => filterSongs(song, inputValue))}
        />
      )}
    </section>
  );
}
