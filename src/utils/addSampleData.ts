import {
  //   insertGenre,
  //   updateSongsWithPopGenre,
  uploadClassicalSongsFromCSV,
} from './../api/helpers/databaseHelpers';

// async function addSampleData() {
//   // const song = await insertSong({ title: 'Sample Song', artist: 'Sample Artist' })
//   const genre = await insertGenre('Classical');
//   // await associateSongWithGenres(song.song_id, [genre.id]);
//   console.log('Sample data added successfully', genre);
// }

// addSampleData();

// updateSongsWithPopGenre();

export const csvData: { title: string; artist: string }[] = [
  { title: 'Berceuse', artist: "Alexander Il'yinsky" },
  { title: 'Etude in C# minor', artist: 'Alexander Scriabin' },
  { title: 'The Four Seasons', artist: 'Antonio Vivaldi' },
  { title: 'Panis Angelicus', artist: 'César Franck' },
  { title: 'Le Petit Negre', artist: 'Claude Debussy' },
  { title: 'Morgenstemning', artist: 'Edvard Grieg' },
  { title: 'Chanson de nuit', artist: 'Edward Elgar' },
  { title: "Salut D'amour", artist: 'Edward Elgar' },
  { title: 'Chanson de matin', artist: 'Edward Elgar' },
  { title: 'Nimrod', artist: 'Edward Elgar' },
  { title: "The Angel's Farewell", artist: 'Edward Elgar' },
  { title: 'To a Wild Rose', artist: 'Edward MacDowell' },
  { title: 'Andaluza', artist: 'Enrique Granados' },
  { title: 'Scherzo', artist: 'Felix Mendelssohn-Bartholdy' },
  { title: 'Wedding March', artist: 'Felix Mendelssohn-Bartholdy' },
  { title: 'Serenade (from Hassan)', artist: 'Frederick Delius' },
  { title: 'La Calinda', artist: 'Frederick Delius' },
  { title: 'Brigg Fair', artist: 'Frederick Delius' },
  { title: 'Après un rêve', artist: 'Gabriel Fauré' },
  { title: 'Pavane', artist: 'Gabriel Fauré' },
  { title: 'Pie Jesu', artist: 'Gabriel Fauré' },
  { title: 'Arrival of the Queen of Sheba', artist: 'George Frideric Handel' },
  { title: 'Ombra mai fù', artist: 'George Frideric Handel' },
  { title: 'La Toupie', artist: 'Georges Bizet' },
  { title: "Entr'acte", artist: 'Georges Bizet' },
  { title: 'Bist du bei mir', artist: 'Gottfried Heinrich Stolzel' },
  { title: 'Air (from Brook Green Suite)', artist: 'Gustav Holst' },
  { title: "Pieds-en l'air (from Capriol Suite)", artist: 'Gustav Holst' },
  { title: 'Trumpet Tune', artist: 'Henry Purcell' },
  { title: 'Ave Maria', artist: 'J.S. Bach' },
  { title: 'Liberty Bell', artist: 'John Philip Sousa' },
  { title: 'Flower Duet', artist: 'Léo Delibes' },
  { title: 'Folk Song Prelude No. 2', artist: 'Peter Warlock' },
  { title: 'Bridal Chorus', artist: 'Richard Wagner' },
  { title: 'Heliotrope Bouquet', artist: 'Scott Joplin' },
  { title: 'Voi che sapete', artist: 'Wolfgang Amadeus Mozart' },
];

await uploadClassicalSongsFromCSV(csvData);
