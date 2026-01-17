import SongList from '../components/SongList';
import PlaylistList from '../components/PlaylistList';
import { useSearchParams } from 'react-router';
import SearchBox from '../components/SearchBox';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistSlug = searchParams.get('playlist');
  const searchQuery = searchParams.get('q');

  const handlePlaylistSelect = (slug: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newParams.has('q')) {
        newParams.delete('q');
      }
      if (slug === '') {
        newParams.delete('playlist');
      } else {
        newParams.set('playlist', slug);
      }
      return newParams;
    });
  };

  return (
    <section>
      <SearchBox />
      <PlaylistList
        selectedSlug={playlistSlug}
        onSelect={handlePlaylistSelect}
      />
      <SongList playlistSlug={playlistSlug} searchQuery={searchQuery} />
    </section>
  );
}
