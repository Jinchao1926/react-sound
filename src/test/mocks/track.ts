import type { Track, Track2 } from '@/types/track'

import { mockAlbum } from './album'
import { mockArtist } from './artist'

/**
 * Mock Track data for testing
 */
export const mockTrack: Track = {
  id: 123,
  name: '江南',
  dt: 240000,
  ar: [mockArtist],
  al: mockAlbum,
  tns: ['Jiangnan Translation'],
  alia: ['江南地区'],
  mv: 456,
}

/**
 * Mock Track2 data for testing
 */
export const mockTrack2: Track2 = {
  id: 123,
  name: '江南',
  duration: 240000,
  artists: [mockArtist],
  album: mockAlbum,
  transNames: ['Jiangnan'],
  mvid: 456,
  dt: 240000,
  tns: [],
  alia: ['江南地区'],
  mv: 0,
}

/**
 * Factory function to create a custom mock Track
 */
export const createMockTrack = (overrides: Partial<Track> = {}): Track => ({
  ...mockTrack,
  ...overrides,
})

/**
 * Factory function to create a custom mock Track2
 */
export const createMockTrack2 = (overrides: Partial<Track2> = {}): Track2 => ({
  ...mockTrack2,
  ...overrides,
})
