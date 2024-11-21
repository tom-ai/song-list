import SongList from './components/SongList';

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>Amba Strings' Song List</h1>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <SongList />
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
