import SongList from './components/SongList';
import { Song } from './types/Song';
import songList from './data/songs.json';
import { Link, useSearchParams } from 'react-router';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import SearchBox from './components/SearchBox';

function App() {
  const [params, setParams] = useSearchParams({});
  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  function handleChange(value: string) {
    setInputValue(value);
    debouncedSetParams(value);
  }

  function filterSongs(song: Song) {
    const searchQ = inputValue.toLowerCase().trim();

    const { songName, artist } = song;
    return (
      songName.toLowerCase().includes(searchQ) ||
      artist.toLowerCase().includes(searchQ)
    );
  }

  const debouncedSetParams = useMemo(
    () =>
      debounce((value: string) => {
        if (value === '') {
          setParams({});
        } else {
          console.log(value);
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
          <SearchBox value={inputValue} onChange={handleChange} />
          {q !== '' && songs.length === 0 ? (
            <p>No songs found matching "{inputValue}"</p>
          ) : (
            <SongList songs={songs} />
          )}
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
