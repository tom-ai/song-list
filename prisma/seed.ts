import * as fs from 'fs';
import { prisma } from '../src/data/prisma';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const songsData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../src/data/songs.json'), 'utf-8')
  );

  for (const song of songsData) {
    await prisma.song.upsert({
      where: { artist_title: { title: song.songName, artist: song.artist } },
      update: {},
      create: {
        title: song.songName,
        artist: song.artist,
      },
    });
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
