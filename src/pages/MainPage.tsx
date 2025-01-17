import SongList from '../components/SongList';
import { useOutletContext } from 'react-router';
import SearchBox from '../components/SearchBox';
import { useSearch } from '../hooks/useSearch';
import { AppContext } from '../App';

export default function MainPage() {
  const { songs, isLoading, error } = useOutletContext<AppContext>();
  const { inputValue, setInputValue, filteredSongs, searchQuery } =
    useSearch(songs);

  return (
    <section>
      {}
      <SearchBox value={inputValue} onChange={setInputValue} />
      {isLoading ? (
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
