import SongList from './components/SongList';
import { Song } from './types/Song';
import songList from './data/songs.json';
import { Link, useSearchParams } from 'react-router';
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

function App() {
  const [params, setParams] = useSearchParams({});
  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  function filterSongs(song: Song) {
    const searchQ = inputValue.toLowerCase();

    const { songName, artist } = song;
    return (
      songName.toLowerCase().includes(searchQ) ||
      artist.toLowerCase().includes(searchQ)
    );
  }

  const debouncedSetParams = useCallback(
    debounce((value: string) => {
      if (value === '') {
        setParams({});
      } else {
        setParams({ q: value }, { replace: true });
      }
    }, 1000),
    [setParams]
  );

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
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              debouncedSetParams(value);
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
