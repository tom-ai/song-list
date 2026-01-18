import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicSongList } from '../types';
import { fetcher } from '../api/helpers/fetcher';

export default function useSongs(
  playlistSlug?: string | null,
  searchQuery?: string | null,
) {
  let url = playlistSlug
    ? `${baseUrl}/playlists/${playlistSlug}/songs`
    : `${baseUrl}/songs`;

  if (searchQuery) {
    url += `?q=${searchQuery}`;
  }

  const {
    data,
    isLoading,
    error: swrError,
  } = useSWR<PublicSongList, APIError>(url, fetcher);

  return {
    songs: data,
    isLoading,
    error: swrError?.error,
  };
}
