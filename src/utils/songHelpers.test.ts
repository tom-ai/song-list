import { expect, test, describe } from 'vitest';
import { filterSongs } from './songHelpers';
import { Song } from '../types';

describe('Filter Songs', () => {
  const testSongs: Song[] = [
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      created_at: '2025-01-09T15:00:00Z',
      id: 1,
    },
    {
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      created_at: '2025-01-09T15:00:00Z',
      id: 2,
    },
    {
      title: 'Hotel California',
      artist: 'Eagles',
      created_at: '2025-01-09T15:00:00Z',
      id: 3,
    },
  ];

  test('filters by full song name', () => {
    const result = testSongs.filter((song) =>
      filterSongs(song, 'Bohemian Rhapsody')
    );
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Bohemian Rhapsody');
  });

  test('filters by partial song name', () => {
    const result = testSongs.filter((song) => filterSongs(song, 'heaven'));
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Stairway to Heaven');
  });

  test('filters by full artist name', () => {
    const result = testSongs.filter((song) => filterSongs(song, 'Queen'));
    expect(result).toHaveLength(1);
    expect(result[0].artist).toBe('Queen');
  });

  test('filters by partial artist name', () => {
    const result = testSongs.filter((song) => filterSongs(song, 'led'));
    expect(result).toHaveLength(1);
    expect(result[0].artist).toBe('Led Zeppelin');
  });

  test('is case-insensitive', () => {
    const result = testSongs.filter((song) => filterSongs(song, 'QUEEN'));
    expect(result).toHaveLength(1);
    expect(result[0].artist).toBe('Queen');
  });

  test('returns false for no match', () => {
    const result = testSongs.filter((song) => filterSongs(song, 'Jazz'));
    expect(result).toHaveLength(0);
  });

  test('handles trimmed input', () => {
    const result = testSongs.filter((song) => filterSongs(song, '  Queen  '));
    expect(result).toHaveLength(1);
    expect(result[0].artist).toBe('Queen');
  });
});
