import type { Database } from './../types/database.types';

export type Song = Database['public']['Tables']['Song']['Row'];
export type Playlist = Database['public']['Tables']['Playlist']['Row'];
export type PlaylistSong = Database['public']['Tables']['PlaylistSong']['Row'];

export type SongWithGenres = Song & {
  genres: { name: string }[];
};
