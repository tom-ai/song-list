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

  if (isLoading) return <p>Loading playlists...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="playlist-chips">
      <button
        className="outline"
        onClick={(e) => {
          e.preventDefault();
          onSelect('');
        }}
        aria-current={!selectedSlug}
      >
        All
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
            {`${playlist.name} (${playlist.totalSongs})`}
          </button>
        ))}
    </div>
  );
}
