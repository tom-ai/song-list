import SongList from '../components/SongList';
import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSongs from '../hooks/useSongs';

export default function MainPage() {
  //   const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <section>
      {/* <SearchBox value={inputValue} onChange={setInputValue} /> */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBlockEnd: '1rem',
        }}
      >
        {/* <button
          className="outline"
          aria-current={selectedGenre === null}
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button> */}

        {/* {GENRES.map((genre) => (
          <button
            key={genre}
            className="outline"
            aria-current={selectedGenre === genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))} */}
      </div>

      <SongList />
    </section>
  );
}
