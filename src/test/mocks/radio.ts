import type { Radio } from '@/types/djradio'

/**
 * Mock Radio data for testing
 */
export const mockRadio: Radio = {
  id: 1226832567,
  name: 'Test Radio',
  rcmdtext: 'Test recommendation',
  picUrl: 'https://example.com/radio.jpg',
  desc: 'Test radio description',
  createTime: 1705989324870,
  categoryId: 2,
  category: '音乐播客',
  secondCategory: '音乐故事',
  lastProgramId: 3080620133,
  lastProgramName: 'Test Program',
  lastProgramCreateTime: 1751974109437,
  programCount: 1,
  subCount: 100,
  playCount: 1000,
  shareCount: 50,
  likedCount: 200,
  commentCount: 25,
  dj: {
    userId: 45218094,
    nickname: 'Test DJ',
    avatarUrl: 'https://example.com/dj-avatar.jpg',
  },
}

/**
 * Factory function to create a custom mock Radio
 */
export const createMockRadio = (overrides: Partial<Radio> = {}): Radio => ({
  ...mockRadio,
  ...overrides,
  dj: {
    ...mockRadio.dj,
    ...(overrides.dj || {}),
  },
})
