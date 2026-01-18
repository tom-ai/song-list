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
      <header className="header">
        <a href="/">
          <h1>Amba Strings Repertoire</h1>
        </a>
        {/* <div>
          <a href="https://ambastrings.co.uk">
            <img src={logo} alt="Amba Strings" width={100} height={100} />
          </a>
        </div> */}
      </header>

      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <aside className="grid">
          <div className="footer-logo">
            <a href="https://ambastrings.co.uk">
              <img src={logo} alt="Amba Strings" width={100} height={100} />
            </a>
          </div>
          <nav>
            <ul>
              <li>
                Website:{' '}
                <a href="https://ambastrings.co.uk">ambastrings.co.uk</a>
              </li>
              <li>
                Instagram:{' '}
                <a href="https://instagram.com/ambastrings">@ambastrings</a>
              </li>
              <li>
                <a target="_blank" href="https://app.groovetech.co.uk/admin">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </footer>
    </>
  );
}

export default App;
