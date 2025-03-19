import { SongWithGenres } from './../types';

// import { addSong } from '../api';

export default function SongList({ songs }: { songs: SongWithGenres[] }) {
  // function handleClick(songId: number) {
  //   console.log(songId);
  //   // addSong(songId);
  // }

  // const { playlistExists } = useOutletContext<AppContext>();

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
                {/* {playlistExists && (
                  <th scope="row">
                    <button onClick={() => handleClick(song.id)}></button>
                  </th>
                )} */}
                <th scope="row">{song.title}</th>
                <td>{song.artist}</td>
                {/* <td>
                  {song.genres.map((genre) => {
                    return (
                      <>
                        <span>{genre.name}</span>
                      </>
                    );
                  })}
                </td> */}
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
