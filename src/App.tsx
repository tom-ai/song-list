import SongList from './components/SongList';
import { Song } from './types/Song';
import songList from './data/songs.json';
import { Link, useSearchParams } from 'react-router';
import { useState } from 'react';
import SearchBox from './components/SearchBox';
import { filterSongs } from './utils/songHelpers';
import { useDebouncedSetParams } from './hooks/useDebouncedSetParams';

function App() {
  const [params, setParams] = useSearchParams({});
  const [inputValue, setInputValue] = useState(params.get('q') ?? '');

  const q = params.get('q') ?? '';

  const debouncedSetParams = useDebouncedSetParams(setParams, 500);

  const songs: Song[] = songList.filter((song) =>
    filterSongs(song, inputValue)
  );

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
          <SearchBox
            value={inputValue}
            onChange={(value) => {
              setInputValue(value);
              debouncedSetParams(value);
            }}
          />
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
