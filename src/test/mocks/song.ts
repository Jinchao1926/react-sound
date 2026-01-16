import type { Song } from '@/types/track'

import { mockAlbum } from './album'
import { mockArtist } from './artist'

/**
 * Mock Song data for testing
 */
export const mockSong: Song = {
  id: 123,
  name: '江南',
  artists: [mockArtist],
  album: mockAlbum,
  duration: 240000,
  alias: ['Jiangnan'],
  mvid: 456,
}

/**
 * Factory function to create a custom mock Song
 */
export const createMockSong = (overrides: Partial<Song> = {}): Song => ({
  ...mockSong,
  ...overrides,
})
