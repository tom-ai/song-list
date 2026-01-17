import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

type SearchBoxProps = {
  debounceDelay?: number;
};

export default function SearchBox({ debounceDelay = 300 }: SearchBoxProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialData = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(initialData);

  useEffect(() => {
    const currentQuery = searchParams.get('q') ?? '';
    if (inputValue !== currentQuery) {
      setInputValue(currentQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (inputValue && newParams.has('playlist')) {
          newParams.delete('playlist');
        }

        if (inputValue) {
          newParams.set('q', inputValue);
        } else {
          newParams.delete('q');
        }
        return newParams;
      });
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay, setSearchParams]);

  return (
    <input
      type="search"
      name="search"
      placeholder="Search repertoire"
      aria-label="Search"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ marginBlockEnd: '1rem' }}
    />
  );
}
