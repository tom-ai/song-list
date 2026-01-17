import SongList from '../components/SongList';
import PlaylistList from '../components/PlaylistList';
import { useSearchParams } from 'react-router';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistSlug = searchParams.get('playlist');

  const handlePlaylistSelect = (slug: string) => {
    setSearchParams({ playlist: slug });
  };

  return (
    <section>
      {/* <SearchBox value={inputValue} onChange={setInputValue} /> */}
      <PlaylistList
        selectedSlug={playlistSlug}
        onSelect={handlePlaylistSelect}
      />
      <SongList playlistSlug={playlistSlug} />
    </section>
  );
}
