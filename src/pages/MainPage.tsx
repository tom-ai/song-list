import SongList from '../components/SongList';
import { Song } from '../types/Song';
import songList from '../data/songs.json';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import { filterSongs } from '../utils/songHelpers';
import { useDebouncedSetParams } from '../hooks/useDebouncedSetParams';

export default function MainPage() {
  const [params, setParams] = useSearchParams({});

  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  const debouncedSetParams = useDebouncedSetParams(setParams, 500);

  const songs: Song[] = songList.filter((song) =>
    filterSongs(song, inputValue)
  );

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
        <SongList songs={songs} />
      )}
    </section>
  );
}
