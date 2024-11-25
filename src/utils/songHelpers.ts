import { Song } from '../types/Song';

export function filterSongs(song: Song, query: string) {
  const searchQ = query.toLowerCase().trim();

  const { songName, artist } = song;
  return (
    songName.toLowerCase().includes(searchQ) ||
    artist.toLowerCase().includes(searchQ)
  );
}
