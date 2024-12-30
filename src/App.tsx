import { NavLink, Outlet } from 'react-router';

function App() {
  return (
    <>
      <header>
        <hgroup>
          <h1>Amba Strings</h1>
          <p>Add songs to a playlist and share!</p>
        </hgroup>
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
      </header>
      <main>
        <Outlet />
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
