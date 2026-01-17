import usePlaylists from '../hooks/usePlaylists';

export default function PlaylistList() {
  const { playlists, isLoading, error } = usePlaylists();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>; // could move up to parent?

  // aria current and selected value state
  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBlockEnd: '1rem',
      }}
    >
      {playlists &&
        playlists.items.map((playlist) => (
          <button key={playlist.id} className="outline">
            {playlist.name}
          </button>
        ))}
    </form>
  );
}
