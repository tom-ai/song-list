import { NavLink, Outlet } from 'react-router';
import useSongs from './hooks/useSongs';
import featureFlags from './featureFlags.json';
import { Song } from './types';
import { checkPlaylistExists } from './api/playlist';
import { useEffect, useState } from 'react';

export interface AppContext {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  playlistExists: boolean;
}

function App() {
  const { songs, loading, error } = useSongs();

  const [playlistExists, setPlaylistExists] = useState<boolean>();

  useEffect(() => {
    const id = '5790eb0e-b51b-43c1-b16e-e4b9702beec1';
    checkPlaylistExists(id).then((res) => setPlaylistExists(res));
  }, []);

  return (
    <>
      <header style={{ paddingBlock: '1rem' }}>
        <hgroup>
          <h1>Amba Strings</h1>
          {featureFlags.hasPlaylist ? (
            <p>Add songs to a playlist and share!</p>
          ) : (
            <p>Song List</p>
          )}
        </hgroup>
        {featureFlags.hasPlaylist && (
          <nav>
            <ul>
              <li>
                <NavLink to="/">Song List</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/playlist">My Playlist</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main>
        <Outlet context={{ songs, loading, error, playlistExists }} />
      </main>
      <footer>
        <nav>
          <ul>
            <li>
              Follow <a href="http://instagram.com/ambastrings">@ambastrings</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default App;
