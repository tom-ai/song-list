import { useOutletContext } from 'react-router';
import { AppContext } from '../App';

export default function PlaylistPage() {
  const { playlistExists } = useOutletContext<AppContext>();

  return (
    <>
      <h1>Playlist</h1>
      {playlistExists && <p>Yes</p>}
    </>
  );
}
