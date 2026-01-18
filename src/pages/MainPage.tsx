import SongList from '../components/SongList';
import PlaylistList from '../components/PlaylistList';
import { useSearchParams } from 'react-router';
import SearchBox from '../components/SearchBox';
import { useEffect } from 'react';
import usePlaylists from '../hooks/usePlaylists';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistSlug = searchParams.get('playlist');
  const searchQuery = searchParams.get('q');
  const { playlists } = usePlaylists();

  useEffect(() => {
    const baseTitle = 'Repertoire | Amba Strings';
    let newTitle = baseTitle;

    if (searchQuery) {
      newTitle = `Searching for "${searchQuery}" | Amba Strings`;
    } else if (playlistSlug) {
      const currentPlaylist = playlists?.items.find(
        (p) => p.slug === playlistSlug,
      );

      if (currentPlaylist) {
        newTitle = `${currentPlaylist.name} | Amba Strings`;
      }
    }

    document.title = newTitle;
  }, [searchQuery, playlistSlug, playlists]);

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
    <>
      <form className="sticky-controls">
        <SearchBox />
        <PlaylistList
          selectedSlug={playlistSlug}
          onSelect={handlePlaylistSelect}
        />
      </form>
      <SongList playlistSlug={playlistSlug} searchQuery={searchQuery} />
    </>
  );
}
