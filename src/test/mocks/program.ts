import type { Program } from '@/types/program'
import type { Track2 } from '@/types/track'

import { mockArtist } from './artist'
import { mockRadio } from './radio'

/**
 * Mock Track2 for Program mainSong
 */
const mockProgramTrack: Track2 = {
  id: 2724015137,
  name: 'Test Song',
  duration: 83043,
  dt: 83043,
  artists: [mockArtist],
  album: {
    id: 0,
    name: 'Program Album',
    artist: mockArtist,
    picUrl: 'https://example.com/original-album.jpg',
    alias: [],
    publishTime: 1751974109437,
    company: 'Test Company',
    description: 'Test album description',
  },
  mvid: 0,
  tns: [],
  alia: [],
  mv: 0,
}

/**
 * Mock Program data for testing
 */
export const mockProgram: Program = {
  id: 3080620133,
  name: 'Test Program',
  serialNum: 1,
  coverUrl: 'https://example.com/cover.jpg',
  duration: 83043,
  createTime: 1751974109437,
  description: 'Test program description',
  subscribed: false,
  subscribedCount: 0,
  shareCount: 0,
  commentCount: 0,
  listenerCount: 164,
  likedCount: 2,
  trackCount: 0,
  mainSong: mockProgramTrack,
  songs: [],
  radio: mockRadio,
}

/**
 * Factory function to create a custom mock Program
 */
export const createMockProgram = (
  overrides: Partial<Program> = {}
): Program => {
  const mainSong: Track2 = overrides.mainSong
    ? {
        ...mockProgram.mainSong,
        ...overrides.mainSong,
        album: {
          ...mockProgram.mainSong.album,
          ...(overrides.mainSong.album || {}),
        },
      }
    : mockProgram.mainSong

  return {
    ...mockProgram,
    ...overrides,
    mainSong,
  }
}
