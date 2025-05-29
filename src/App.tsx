import { NavLink, Outlet } from 'react-router';
import featureFlags from './featureFlags.json';
import { useEffect } from 'react';
import '@fontsource-variable/space-grotesk';
import logo from './../public/logo-white.svg';

// import { SongWithGenres } from './types';
// import { useSongsWithGenres } from './hooks/useSongsWithGenres';
// import { checkPlaylistExists } from './api/playlist';
// import { useEffect, useState } from 'react';

// export interface AppContext {
//   songs: SongWithGenres[];
//   isLoading: boolean;
//   error: string | null;
//   playlistExists: boolean;
// }

function App() {
  // const { songs, loading, error } = useSongsWithGenres();

  // const [playlistExists, setPlaylistExists] = useState<boolean>();

  // useEffect(() => {
  //   const id = '5790eb0e-b51b-43c1-b16e-e4b9702beec1';
  //   checkPlaylistExists(id).then((res) => setPlaylistExists(res));
  // }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <>
      <header
        style={{
          paddingBlock: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a href="https://ambastrings.co.uk">
          <img src={logo} alt="Amba Strings" width={120} height={120} />
        </a>
        {/* <h1>Repertoire</h1> */}
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
        <Outlet
        // context={{
        //   songs,
        //   loading,
        //   error,
        //   // playlistExists
        // }}
        />
      </main>
      <footer>
        <nav>
          <ul>
            <li>
              Website: <a href="https://ambastrings.co.uk">ambastrings.co.uk</a>
            </li>
            <li>
              Instagram:{' '}
              <a href="http://instagram.com/ambastrings">@ambastrings</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default App;
