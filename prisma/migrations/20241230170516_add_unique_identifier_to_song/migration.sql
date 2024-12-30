/*
  Warnings:

  - A unique constraint covering the columns `[artist,title]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_artist_title_key" ON "Song"("artist", "title");
