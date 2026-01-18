import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicPlaylistList } from '../types';
import { fetcher } from '../api/helpers/fetcher';

export default function usePlaylists() {
  const {
    data,
    isLoading,
    error: swrError,
  } = useSWR<PublicPlaylistList, APIError>(`${baseUrl}/playlists`, fetcher);

  return {
    playlists: data,
    isLoading,
    error: swrError?.error,
  };
}
