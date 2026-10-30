import SongList from '../components/SongList';
import TagList from '../components/TagList';
import { useSearchParams } from 'react-router';
import SearchBox from '../components/SearchBox';
import { useEffect } from 'react';


export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    const baseTitle = 'Repertoire | Amba Strings';
    let newTitle = baseTitle;

    if (searchQuery) {
      newTitle = `Searching for "${searchQuery}" | Amba Strings`;
    } else if (tag) {
      newTitle = `${tag} | Amba Strings`;
    }

    document.title = newTitle;
  }, [searchQuery, tag]);

  const handleTagSelect = (selected: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newParams.has('q')) {
        newParams.delete('q');
      }
      if (selected === '') {
        newParams.delete('tag');
      } else {
        newParams.set('tag', selected);
      }
      return newParams;
    });
  };

  return (
    <>
      <form
        className="sticky-controls"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchBox />
        <TagList selectedTag={tag} onSelect={handleTagSelect} />
      </form>
      <SongList tag={tag} searchQuery={searchQuery} />
    </>
  );
}
