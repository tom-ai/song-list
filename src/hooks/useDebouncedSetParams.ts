import { useMemo } from 'react';
import { debounce } from 'lodash';
import { SetURLSearchParams } from 'react-router';

export function useDebouncedSetParams(
  setParams: SetURLSearchParams,
  delay = 1000
) {
  return useMemo(
    () =>
      debounce((value: string) => {
        if (value === '') {
          setParams({});
        } else {
          setParams({ q: value }, { replace: true });
        }
      }, delay),
    [setParams, delay]
  );
}
