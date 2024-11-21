import { Song } from '../types/Song';
import songList from '../data/songs.json';

export default function SongList() {
  const songs: Song[] = songList;

  return (
    <>
      <table className="striped">
        <thead>
          <tr>
            <th scope="col">Song Name</th>
            <th scope="col">Artist</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => {
            return (
              <tr key={i}>
                <th scope="row">{song.songName}</th>
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
