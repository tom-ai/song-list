import SongList from '../components/SongList';
import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {}, [selectedGenre]);

  //   const { inputValue, setInputValue, filteredSongs, searchQuery } = useSearch(
  //     state.songs,
  //   );

  return (
    <section>
      {}
      <SearchBox value={inputValue} onChange={setInputValue} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBlockEnd: '1rem',
        }}
      >
        <button
          className="outline"
          aria-current={selectedGenre === null}
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button>

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
      {state.loading ? (
        <p>Loading songs...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : searchQuery !== '' && filteredSongs.length === 0 ? (
        <p>No songs found matching "{searchQuery}"</p>
      ) : (
        <SongList songs={filteredSongs} />
      )}
    </section>
  );
}
