import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.tsx';
import MainPage from './pages/MainPage.tsx';
import PlaylistPage from './pages/PlaylistPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
