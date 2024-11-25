import { Song } from '../types/Song';

export function filterSongs(song: Song, searchValue: string) {
  const searchQ = searchValue.toLowerCase().trim();

  const { songName, artist } = song;
  return (
    songName.toLowerCase().includes(searchQ) ||
    artist.toLowerCase().includes(searchQ)
  );
}
