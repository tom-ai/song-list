import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicSongList } from '../types';

export default function useSongs() {
  const {
    data,
    isLoading,
    error: swrError,
  } = useSWR<PublicSongList, APIError>(`${baseUrl}/songs`);

  return {
    songs: data,
    isLoading,
    error: swrError?.error,
  };
}
