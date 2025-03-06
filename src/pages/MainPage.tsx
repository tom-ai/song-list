import SongList from '../components/SongList';
import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';
import { getSongsByGenre } from '../api/helpers/databaseHelpers';
import { SongWithGenres } from '../types';
// import { AppContext } from '../App';

const GENRES = ['Pop', 'Classical'] as const;

export default function MainPage() {
  const [state, setState] = useState({
    songs: [] as SongWithGenres[],
    loading: true,
    error: null as string | null,
  });
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    getSongsByGenre(selectedGenre)
      .then((songs) => setState({ songs, loading: false, error: null }))
      .catch((err) =>
        setState({
          songs: [],
          loading: false,
          error:
            err instanceof Error ? err.message : 'An unknown error occurred',
        })
      );
  }, [selectedGenre]);

  const { inputValue, setInputValue, filteredSongs, searchQuery } = useSearch(
    state.songs
  );

  return (
    <section>
      {}
      <SearchBox value={inputValue} onChange={setInputValue} />
      <div role="group">
        <button
          className="secondary"
          aria-current={selectedGenre === null}
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre}
            className="secondary"
            aria-current={selectedGenre === genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
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
