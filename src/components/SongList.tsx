import { SongWithGenres } from './../types';

export default function SongList({ songs }: { songs: SongWithGenres[] }) {
  return (
    <>
      <table id="table" className="striped">
        <thead>
          <tr>
            {/* {playlistExists && <th scope="col"></th>} */}
            <th scope="col">Song Name</th>
            <th scope="col">Artist</th>
            {/* <th scope="col">Genre(s)</th> */}
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => {
            return (
              <tr key={i}>
                <th scope="row">{song.title}</th>
                <td>{song.artist}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>{songs.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
