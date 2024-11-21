import SongList from './components/SongList';

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>Amba Strings Song List</h1>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <SongList />
      </main>
    </>
  );
}

export default App;
