import { PublicSong } from '../types';

export function filterSongs(song: PublicSong, query: string) {
  const searchQ = query.toLowerCase().trim();

  const { title, artist } = song;
  return (
    title.toLowerCase().includes(searchQ) ||
    artist.toLowerCase().includes(searchQ)
  );
}
