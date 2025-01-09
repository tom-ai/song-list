import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { debounce } from 'lodash';
import { Song } from '../types';
import { filterSongs } from '../utils/songHelpers';

export function useSearch(songs: Song[], debounceDelay = 500) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '');

  const debouncedSetParams = useMemo(
    () =>
      debounce((value: string) => {
        if (value === '') {
          setSearchParams({});
        } else {
          setSearchParams({ q: value }, { replace: true });
        }
      }, debounceDelay),
    [setSearchParams, debounceDelay]
  );

  useEffect(() => {
    debouncedSetParams(inputValue);

    return () => {
      debouncedSetParams.cancel();
    };
  }, [inputValue, debouncedSetParams]);

  const filteredSongs = useMemo(
    () => songs.filter((song) => filterSongs(song, inputValue)),
    [songs, inputValue]
  );

  return {
    inputValue,
    setInputValue,
    filteredSongs,
    searchQuery: searchParams.get('q') ?? '',
  };
}
