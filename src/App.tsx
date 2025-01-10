import { NavLink, Outlet } from 'react-router';
import useSongs from './hooks/useSongs';
import featureFlags from './featureFlags.json';

function App() {
  const { songs, isLoading, error } = useSongs();

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
        <Outlet context={{ songs, isLoading, error }} />
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
