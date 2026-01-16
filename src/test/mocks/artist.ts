import type { Artist } from '@/types/music'

/**
 * Mock Artist data for testing
 */
export const mockArtist: Artist = {
  id: 1,
  accountId: 123,
  name: '林俊杰',
  img1v1Url: 'https://example.com/img1v1.jpg',
  picUrl: 'https://example.com/pic.jpg',
  alias: ['JJ Lin'],
}

/**
 * Alternative mock Artist for testing multiple artists scenarios
 */
export const mockArtist2: Artist = {
  id: 2,
  accountId: 456,
  name: '张学友',
  img1v1Url: 'https://example.com/img2.jpg',
  picUrl: 'https://example.com/pic2.jpg',
  alias: ['Jacky Cheung'],
}

/**
 * Factory function to create a custom mock Artist
 */
export const createMockArtist = (overrides: Partial<Artist> = {}): Artist => ({
  ...mockArtist,
  ...overrides,
})
