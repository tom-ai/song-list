import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicSongList } from '../types';
import { fetcher } from '../api/helpers/fetcher';

export default function useSongs(
  tag?: string | null,
  searchQuery?: string | null,
) {
  const params = new URLSearchParams();
  if (tag) params.set('tag', tag);
  if (searchQuery) params.set('q', searchQuery);
  const qs = params.toString();
  const url = qs ? `${baseUrl}/songs?${qs}` : `${baseUrl}/songs`;

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
