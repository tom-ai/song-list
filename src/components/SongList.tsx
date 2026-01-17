import useSongs from '../hooks/useSongs';

export default function SongList() {
  const { songs, isLoading, error } = useSongs(); // pass in slug

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>; // could move up to parent?

  return (
    <table id="table" className="striped">
      <thead>
        <tr>
          <th scope="col">Song Name</th>
          <th scope="col">Artist</th>
        </tr>
      </thead>
      <tbody>
        {songs &&
          songs.items.map((song) => (
            <tr key={song.id}>
              <th scope="row">{song.title}</th>
              <td scope="row">{song.artist}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>{songs?.meta.total}</td>
        </tr>
      </tfoot>
    </table>
  );
}
