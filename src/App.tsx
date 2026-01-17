import { Outlet } from 'react-router';
import { useEffect } from 'react';
import '@fontsource-variable/space-grotesk';
import logo from './../public/logo-white.svg';

function App() {
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
      </header>
      <main>
        <Outlet />
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
