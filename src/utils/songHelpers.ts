import { Song } from '../types/Song';

export function filterSongs(song: Song, query: string) {
  const searchQ = query.toLowerCase().trim();

  const { title, artist } = song;
  return (
    title.toLowerCase().includes(searchQ) ||
    artist.toLowerCase().includes(searchQ)
  );
}
