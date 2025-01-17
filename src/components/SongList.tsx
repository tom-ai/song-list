import { useOutletContext } from 'react-router';
import { Song } from './../types';
import { AppContext } from '../App';

export default function SongList({ songs }: { songs: Song[] }) {
  function handleClick(songId: number) {
    console.log(songId);
  }

  const { playlistExists } = useOutletContext<AppContext>();

  return (
    <>
      <table id="table" className="striped">
        <thead>
          <tr>
            {playlistExists && <th scope="col"></th>}
            <th scope="col">Song Name</th>
            <th scope="col">Artist</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => {
            return (
              <tr key={i}>
                {playlistExists && (
                  <th scope="row">
                    <button onClick={() => handleClick(song.id)}></button>
                  </th>
                )}
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
