import useTags from '../hooks/useTags';

type TagListProps = {
  selectedTag?: string | null;
  onSelect: (tag: string) => void;
};

export default function TagList({ selectedTag, onSelect }: TagListProps) {
  const { tags, isLoading, error } = useTags();

  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="playlist-chips">
      <button
        className="outline"
        onClick={(e) => {
          e.preventDefault();
          onSelect('');
        }}
        aria-current={!selectedTag}
      >
        All
      </button>
      {tags &&
        tags.items.map(({ tag, count }) => (
          <button
            key={tag}
            className="outline"
            onClick={(e) => {
              e.preventDefault();
              onSelect(tag);
            }}
            aria-current={selectedTag === tag ? 'true' : undefined}
          >
            {`${tag} (${count})`}
          </button>
        ))}
    </div>
  );
}
