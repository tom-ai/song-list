import useSWR from 'swr';
import { baseUrl } from '../api/helpers/constants';
import { APIError, PublicTagList } from '../types';
import { fetcher } from '../api/helpers/fetcher';

export default function useTags() {
  const {
    data,
    isLoading,
    error: swrError,
  } = useSWR<PublicTagList, APIError>(`${baseUrl}/tags`, fetcher);

  return {
    tags: data,
    isLoading,
    error: swrError?.error,
  };
}
