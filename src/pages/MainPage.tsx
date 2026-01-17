import SongList from '../components/SongList';
import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSongs from '../hooks/useSongs';
import PlaylistList from '../components/PlaylistList';

export default function MainPage() {
  //   const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // update songlist to pass in playlist slug

  // handle
  // prevent default
  // set state of selected
  // re fetch songs by playlist
  
  return (
    <section>
      {/* <SearchBox value={inputValue} onChange={setInputValue} /> */}

      <PlaylistList />

      <SongList />
    </section>
  );
}
