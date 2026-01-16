import type { Album } from '@/types/music'

import { mockArtist, mockArtist2 } from './artist'

/**
 * Mock Album data for testing
 */
export const mockAlbum: Album = {
  id: 100,
  name: '西界',
  artist: mockArtist,
  picUrl: 'https://example.com/album.jpg',
  alias: [],
  publishTime: 1648742400000,
  company: 'Album Company',
  description: 'Album description',
}

export const mockAlbum2: Album = {
  id: 102,
  name: 'Album2',
  artist: mockArtist2,
  picUrl: 'https://example.com/album2.jpg',
  alias: [],
  publishTime: 1648742400000,
  company: 'Album2 Company',
  description: 'Album2 description',
}

/**
 * Factory function to create a custom mock Album
 */
export const createMockAlbum = (overrides: Partial<Album> = {}): Album => ({
  ...mockAlbum,
  ...overrides,
})
