import { uploadSongsFromCSV } from './../api/helpers/databaseHelpers';

export const csvData: { title: string; artist: string }[] = [
  {
    title: 'Mamma Mia',
    artist: 'ABBA',
  },
  {
    title: 'Skyfall',
    artist: 'Adele',
  },
  {
    title: "I Don't Wanna Miss A Thing",
    artist: 'Aerosmith',
  },
  {
    title: 'You Oughta Know',
    artist: 'Alanis Morissette',
  },
  {
    title: 'Go The Distance (Hercules)',
    artist: 'Alan Menken',
  },
  {
    title: 'Forrest Gump Theme',
    artist: 'Alan Silvestri',
  },
  {
    title: 'Empire State Of Mind',
    artist: 'Alicia Keys',
  },
  {
    title: 'Say A Little Prayer',
    artist: 'Aretha Franklin',
  },
  {
    title: 'Thank U Next',
    artist: 'Ariana Grande',
  },
  {
    title: 'Sk8er Boi',
    artist: 'Avril Lavigne',
  },
  {
    title: 'I Want It That Way',
    artist: 'Backstreet Boys',
  },
  {
    title: 'Stand By Me',
    artist: 'Ben E. King',
  },
  {
    title: 'White Wedding',
    artist: 'Billy Idol',
  },
  {
    title: 'All The Small Things',
    artist: 'Blink 182',
  },
  {
    title: 'Make You Feel My Love',
    artist: 'Bob Dylan',
  },
  {
    title: 'Three Little Birds',
    artist: 'Bob Marley',
  },
  {
    title: 'Baby One More Time',
    artist: 'Britney Spears',
  },
  {
    title: '24K',
    artist: 'Bruno Mars',
  },
  {
    title: 'Treasure',
    artist: 'Bruno Mars',
  },
  {
    title: 'How Deep Is Your Love',
    artist: 'Calvin Harris',
  },
  {
    title: 'Havana',
    artist: 'Camila Cabello',
  },
  {
    title: 'My Heart Will Go On',
    artist: 'Celine Dion',
  },
  {
    title: 'Good Luck, Babe!',
    artist: 'Chappell Roan',
  },
  {
    title: 'O Holy Night',
    artist: 'Christmas Carol',
  },
  {
    title: 'Glasgow Love Theme (Love Actually)',
    artist: 'Craig Armstrong',
  },
  {
    title: 'Fix You',
    artist: 'Coldplay',
  },
  {
    title: 'Viva La Vida',
    artist: 'Coldplay',
  },
  {
    title: "Gangsta's Paradise",
    artist: 'Coolio',
  },
  {
    title: 'Daft Punk Medley',
    artist: 'Daft Punk',
  },
  {
    title: 'As The World Falls Down',
    artist: 'David Bowie',
  },
  {
    title: 'Starman',
    artist: 'David Bowie',
  },
  {
    title: 'Sway',
    artist: 'Dean Martin',
  },
  {
    title: "That's What Friends Are For",
    artist: 'Dionne Warwick',
  },
  {
    title: 'A Whole New World',
    artist: 'Disney',
  },
  {
    title: 'Beauty and the Beast',
    artist: 'Disney',
  },
  {
    title: 'Still Dre',
    artist: 'Dr.Dre',
  },
  {
    title: "Don't Start Now",
    artist: 'Dua Lipa',
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
  },
  {
    title: 'Non, Je Ne Regrette Rien',
    artist: 'Edith Piaf',
  },
  {
    title: 'One Day Like This',
    artist: 'Elbow',
  },
  {
    title: 'Can You Feel The Love Tonight',
    artist: 'Elton John',
  },
  {
    title: 'Your Song',
    artist: 'Elton John',
  },
  {
    title: 'At Last',
    artist: 'Etta James',
  },
  {
    title: 'Mr. Blue Sky',
    artist: 'Electric Light Orchestra',
  },
  {
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
  },
  {
    title: "You've Got The Love (Live Version)",
    artist: 'Florence + The Machine',
  },
  {
    title: 'Let It Snow, Let It Snow, Let It Snow',
    artist: 'Frank Sinatra',
  },
  {
    title: "Can't Take My Eyes Off You",
    artist: 'Frankie Valli',
  },
  {
    title: "You'll Never Walk Alone",
    artist: 'Gerry & The Pacemakers',
  },
  {
    title: 'Time Of Your Life',
    artist: 'Green Day',
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns 'N' Roses",
  },
  {
    title: 'Pirates Of The Caribbean',
    artist: 'Hans Zimmer',
  },
  {
    title: 'Sign Of The Times',
    artist: 'Harry Styles',
  },
  {
    title: 'The Pink Panther',
    artist: 'Henry Mancini',
  },
  {
    title: 'Hide And Seek',
    artist: 'Imogen Heap',
  },
  {
    title: 'White Christmas',
    artist: 'Irvine Berlin',
  },
  {
    title: 'Sit Down',
    artist: 'James',
  },
  {
    title: 'Games That Lovers Play',
    artist: 'James Last',
  },
  {
    title: 'Diamonds Are Forever',
    artist: 'John Barry',
  },
  {
    title: 'Rudolph The Red-Nosed Reindeer',
    artist: 'John Denver',
  },
  {
    title: 'All Of Me',
    artist: 'John Legend',
  },
  {
    title: 'Imagine',
    artist: 'John Lennon',
  },
  {
    title: 'Theme from E.T.',
    artist: 'John Williams',
  },
  {
    title: "Harry's Wonderous World",
    artist: 'John Williams',
  },
  {
    title: 'Theme from Jurassic Park',
    artist: 'John Williams',
  },
  {
    title: 'Love Will Tear Us Apart',
    artist: 'Joy Division',
  },
  {
    title: 'Cry Me A River',
    artist: 'Justin Timberlake',
  },
  {
    title: 'Cloudbusting',
    artist: 'Kate Bush',
  },
  {
    title: 'I Was Made For Loving You',
    artist: 'KISS',
  },
  {
    title: 'Another Day Of Sun',
    artist: 'La La Land',
  },
  {
    title: 'Shallow',
    artist: 'Lady Gaga',
  },
  {
    title: 'High',
    artist: 'Lighthouse Family',
  },
  {
    title: 'All Around The World',
    artist: 'Lisa Stansfield',
  },
  {
    title: 'About Damn Time',
    artist: 'Lizzo',
  },
  {
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynrd',
  },
  {
    title: 'I Try',
    artist: 'Macy Gray',
  },
  {
    title: 'Material Girl',
    artist: 'Madonna',
  },
  {
    title: "I'll Make a Man Out of You (Mulan)",
    artist: 'Matthew Wilder',
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
  },
  {
    title: 'Wrecking Ball',
    artist: 'Miley Cyrus',
  },
  {
    title: 'Champagne Supernova',
    artist: 'Oasis',
  },
  {
    title: "Don't Look Back In Anger",
    artist: 'Oasis',
  },
  {
    title: 'Happy',
    artist: 'Pharrell',
  },
  {
    title: "You'll Be in My Heart",
    artist: 'Phil Collins',
  },
  {
    title: 'What About Us',
    artist: 'Pink',
  },
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
  },
  {
    title: 'Crazy Little Thing Called Love',
    artist: 'Queen',
  },
  {
    title: "Don't Stop Me Now",
    artist: 'Queen',
  },
  {
    title: 'I Want To Break Free',
    artist: 'Queen',
  },
  {
    title: 'Somebody To Love',
    artist: 'Queen',
  },
  {
    title: "You're My Best Friend",
    artist: 'Queen',
  },
  {
    title: 'Game of Thrones Theme',
    artist: 'Ramin Djawadi',
  },
  {
    title: "You've Got A Friend In Me",
    artist: 'Randy Newman',
  },
  {
    title: 'Dani California',
    artist: 'Red Hot Chili Peppers',
  },
  {
    title: 'Diamonds',
    artist: 'Rihanna',
  },
  {
    title: 'Angels',
    artist: 'Robbie Williams',
  },
  {
    title: 'Dancing On My Own',
    artist: 'Robyn',
  },
  {
    title: "Don't Stop Movin'",
    artist: 'S Club 7',
  },
  {
    title: 'Mrs. Robinson',
    artist: 'Simon and Garfunkel',
  },
  {
    title: '2 Become 1',
    artist: 'Spice Girls',
  },
  {
    title: 'Stop',
    artist: 'Spice Girls',
  },
  {
    title: 'As',
    artist: 'Stevie Wonder',
  },
  {
    title: "Don't You Worry Bout A Thing",
    artist: 'Stevie Wonder',
  },
  {
    title: "Isn't She Lovely",
    artist: 'Stevie Wonder',
  },
  {
    title: "Signed, Sealed, Delivered (I'm Yours)",
    artist: 'Stevie Wonder',
  },
  {
    title: 'Sir Duke',
    artist: 'Stevie Wonder',
  },
  {
    title: 'Superstition',
    artist: 'Stevie Wonder',
  },
  {
    title: 'You Are The Sunshine Of My Life',
    artist: 'Stevie Wonder',
  },
  {
    title: 'Fields of Gold',
    artist: 'Sting',
  },
  {
    title: 'Shine',
    artist: 'Take That',
  },
  {
    title: 'This Must Be The Place',
    artist: 'Talking Heads',
  },
  {
    title: 'Wildest Dreams',
    artist: 'Taylor Swift',
  },
  {
    title: 'God Only Knows',
    artist: 'The Beach Boys',
  },
  {
    title: 'All You Need Is Love',
    artist: 'The Beatles',
  },
  {
    title: 'Blackbird',
    artist: 'The Beatles',
  },
  {
    title: "Can't Buy Me Love",
    artist: 'The Beatles',
  },
  {
    title: 'Eleanor Rigby',
    artist: 'The Beatles',
  },
  {
    title: 'Help!',
    artist: 'The Beatles',
  },
  {
    title: 'Here Comes The Sun',
    artist: 'The Beatles',
  },
  {
    title: 'Here There And Everywhere',
    artist: 'The Beatles',
  },
  {
    title: 'Hey Jude',
    artist: 'The Beatles',
  },
  {
    title: 'I Want To Hold Your Hand',
    artist: 'The Beatles',
  },
  {
    title: 'Let It Be',
    artist: 'The Beatles',
  },
  {
    title: 'Penny Lane',
    artist: 'The Beatles',
  },
  {
    title: 'Something',
    artist: 'The Beatles',
  },
  {
    title: 'Yesterday',
    artist: 'The Beatles',
  },
  {
    title: 'I Believe In A Thing Called Love',
    artist: 'The Darkness',
  },
  {
    title: 'Fairytale Of New York',
    artist: 'The Pogues',
  },
  {
    title: 'I Wanna Be Adored',
    artist: 'The Stone Roses',
  },
  {
    title: 'Golden Brown',
    artist: 'The Stranglers',
  },
  {
    title: 'Bittersweet Symphony',
    artist: 'The Verve',
  },
  {
    title: 'Blinding Lights',
    artist: 'The Weekend',
  },
  {
    title: 'Fly Me To The Moon',
    artist: 'Tony Bennett',
  },
  {
    title: 'Brown Eyed Girl',
    artist: 'Van Morrison',
  },
  {
    title: 'Save The Best For Last',
    artist: 'Vanessa Williams',
  },
  {
    title: 'Happy Xmas (War Is Over)',
    artist: 'Yoko Ono',
  },
];

await uploadSongsFromCSV(csvData, 'Pop');
