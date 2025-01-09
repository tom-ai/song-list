import SongList from '../components/SongList';
import { useOutletContext, useSearchParams } from 'react-router';
import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import { filterSongs } from '../utils/songHelpers';
import { useDebouncedSetParams } from '../hooks/useDebouncedSetParams';
import { Song } from './../types';

interface AppContext {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

export default function MainPage() {
  const [params, setParams] = useSearchParams({});

  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  const debouncedSetParams = useDebouncedSetParams(setParams, 500);

  const { songs, isLoading, error } = useOutletContext<AppContext>();

  const filteredSongs = songs.filter((song) => filterSongs(song, inputValue));

  return (
    <section>
      <SearchBox
        value={inputValue}
        onChange={(value) => {
          setInputValue(value);
          debouncedSetParams(value);
        }}
      />
      {isLoading ? (
        <p>Loading songs...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : q !== '' && filteredSongs.length === 0 ? (
        <p>No songs found matching "{inputValue}"</p>
      ) : (
        <SongList songs={filteredSongs} />
      )}
    </section>
  );
}
