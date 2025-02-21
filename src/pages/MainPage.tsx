import SongList from '../components/SongList';

import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';
import { getSongsByGenre } from '../api/helpers/databaseHelpers';
import { SongWithGenres } from '../types';
import { useSearchParams } from 'react-router';
// import { AppContext } from '../App';

export default function MainPage() {
  // const { songs, isLoading, error } = useOutletContext<AppContext>();
  // const { songs, isLoading, error } = useSongsWithGenres();

  const [songs, setSongs] = useState<SongWithGenres[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSongsByGenre(selectedGenre)
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
  }, [selectedGenre]);

  const { inputValue, setInputValue, filteredSongs, searchQuery } =
    useSearch(songs);

  return (
    <section>
      {}
      <SearchBox value={inputValue} onChange={setInputValue} />
      <div role="group">
        <button
          className="secondary"
          aria-current={selectedGenre === null ? true : false}
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button>
        <button
          className="secondary"
          aria-current={selectedGenre === 'Pop' ? true : false}
          onClick={() => setSelectedGenre('Pop')}
        >
          Pop
        </button>
        <button
          className="secondary"
          aria-current={selectedGenre === 'Classical' ? true : false}
          onClick={() => setSelectedGenre('Classical')}
        >
          Classical
        </button>
      </div>
      {loading ? (
        <p>Loading songs...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : searchQuery !== '' && filteredSongs.length === 0 ? (
        <p>No songs found matching "{searchQuery}"</p>
      ) : (
        <SongList songs={filteredSongs} />
      )}
    </section>
  );
}
