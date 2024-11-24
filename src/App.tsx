import SongList from './components/SongList';
import { Song } from './types/Song';
import songList from './data/songs.json';
import { Link, useSearchParams } from 'react-router';
import debounce from 'lodash/debounce';

function App() {
  const [params, setParams] = useSearchParams({});

  const q = params.get('q') ?? '';

  function filterSongs(song: Song) {
    const searchQ = q.toLowerCase();

    const { songName, artist } = song;
    return (
      songName.toLowerCase().includes(searchQ) ||
      artist.toLowerCase().includes(searchQ)
    );
  }

  const songs: Song[] = songList.filter((song) => filterSongs(song));

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>
                <Link to="/">Amba Strings - Song List</Link>
              </h1>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <input
            type="search"
            name="search"
            placeholder="Search repertoire"
            aria-label="Search"
            value={q}
            onChange={(e) => {
              const value = e.target.value;

              if (value === '') {
                setParams({});
              } else {
                setParams({ q: value }, { replace: true });
              }
            }}
          />
          <SongList songs={songs} />
        </section>
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
