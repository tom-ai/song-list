import * as fs from 'fs';
import { prisma } from '../src/data/prisma';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  type Song = {
    title: string;
    artist: string;
  };

  const songsData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/data/songs.json'), 'utf-8')
  ) as Song[];

  const existingSongs = prisma.song.findMany({
    select: { title: true, artist: true },
  }) as Promise<Song[]>;

  const existingSongsSet = new Set(
    (await existingSongs).map((song) => `${song.title}-${song.artist}`)
  );

  const newSongs = songsData.filter(
    (song) => !existingSongsSet.has(`${song.title}-${song.artist}`)
  );

  if (newSongs.length > 0) {
    await prisma.song.createMany({
      data: newSongs.map((song) => ({
        title: song.title,
        artist: song.artist,
      })),
      skipDuplicates: true,
    });
    console.log(`Added ${newSongs.length} new songs.`);
  } else {
    console.log('No new songs added');
  }

  console.log('Seeding completed');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
