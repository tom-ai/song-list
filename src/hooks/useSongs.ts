import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicSongList } from '../types';
import { fetcher } from '../api/helpers/fetcher';

export default function useSongs() {
  const {
    data,
    isLoading,
    error: swrError,
  } = useSWR<PublicSongList, APIError>(`${baseUrl}/songs`, fetcher);

  return {
    songs: data,
    isLoading,
    error: swrError?.error,
  };
}
