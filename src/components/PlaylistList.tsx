import usePlaylists from '../hooks/usePlaylists';

type PlaylistListProps = {
  selectedSlug?: string | null;
  onSelect: (slug: string) => void;
};

export default function PlaylistList({
  selectedSlug,
  onSelect,
}: PlaylistListProps) {
  const { playlists, isLoading, error } = usePlaylists();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>; // could move up to parent?

  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBlockEnd: '1rem',
      }}
    >
      <button
        className="outline"
        onClick={(e) => {
          e.preventDefault();
          onSelect('');
        }}
        aria-current={selectedSlug === ''}
      >
        All Songs
      </button>
      {playlists &&
        playlists.items.map((playlist) => (
          <button
            key={playlist.id}
            className="outline"
            onClick={(e) => {
              e.preventDefault();
              onSelect(playlist.slug);
            }}
            aria-current={selectedSlug === playlist.slug ? 'true' : undefined}
          >
            {playlist.name}
          </button>
        ))}
    </form>
  );
}
