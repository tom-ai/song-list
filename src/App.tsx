import { Outlet } from 'react-router';
import { useEffect } from 'react';
import '@fontsource-variable/space-grotesk';
import logo from './../public/amba-strings-logo-on-dark.svg';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <>
      <header className="container header">
        <div>
          <a href="https://ambastrings.co.uk">
            <img src={logo} alt="Amba Strings" width={100} height={100} />
          </a>
        </div>
        <a href="/">
          <h1>Repertoire</h1>
        </a>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="container">
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
