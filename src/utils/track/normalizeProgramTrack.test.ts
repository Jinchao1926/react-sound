import { describe, it, expect, beforeEach } from 'vitest'

import { createMockProgram, createMockTrack2, mockAlbum2 } from '@/test/mocks'
import type { Program } from '@/types/program'

import { normalizeProgramTrack } from './normalizeProgramTrack'

describe('normalizeProgramTrack', () => {
  let mockProgram: Program

  beforeEach(() => {
    mockProgram = createMockProgram()
  })

  it('should normalize program cover URL to mainSong.album.picUrl', () => {
    const result = normalizeProgramTrack(mockProgram)

    expect(result.mainSong.album.picUrl).toBe(mockProgram.coverUrl)
    expect(result.mainSong.album.picUrl).toBe('https://example.com/cover.jpg')
  })

  it('should preserve all other program properties', () => {
    const result = normalizeProgramTrack(mockProgram)

    expect(result.id).toBe(mockProgram.id)
    expect(result.name).toBe(mockProgram.name)
    expect(result.serialNum).toBe(mockProgram.serialNum)
    expect(result.coverUrl).toBe(mockProgram.coverUrl)
    expect(result.duration).toBe(mockProgram.duration)
    expect(result.createTime).toBe(mockProgram.createTime)
    expect(result.description).toBe(mockProgram.description)
    expect(result.subscribed).toBe(mockProgram.subscribed)
    expect(result.subscribedCount).toBe(mockProgram.subscribedCount)
    expect(result.shareCount).toBe(mockProgram.shareCount)
    expect(result.commentCount).toBe(mockProgram.commentCount)
    expect(result.listenerCount).toBe(mockProgram.listenerCount)
    expect(result.likedCount).toBe(mockProgram.likedCount)
    expect(result.trackCount).toBe(mockProgram.trackCount)
  })

  it('should preserve mainSong properties except album.picUrl', () => {
    const result = normalizeProgramTrack(mockProgram)

    expect(result.mainSong.id).toBe(mockProgram.mainSong.id)
    expect(result.mainSong.name).toBe(mockProgram.mainSong.name)
    expect(result.mainSong.duration).toBe(mockProgram.mainSong.duration)
    expect(result.mainSong.artists).toBe(mockProgram.mainSong.artists)
    expect(result.mainSong.mvid).toBe(mockProgram.mainSong.mvid)
  })

  it('should preserve album properties except picUrl', () => {
    const result = normalizeProgramTrack(mockProgram)

    expect(result.mainSong.album.id).toBe(mockProgram.mainSong.album.id)
    expect(result.mainSong.album.name).toBe(mockProgram.mainSong.album.name)
  })

  it('should handle empty coverUrl', () => {
    mockProgram.coverUrl = ''
    const result = normalizeProgramTrack(mockProgram)

    expect(result.mainSong.album.picUrl).toBe('')
  })

  it('should handle different coverUrl formats', () => {
    const testUrls = [
      'https://p2.music.126.net/0rlkVADCTeqa1-ZHGKEdvw==/109951171415631579.jpg',
      'http://example.com/image.png',
      'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
    ]

    testUrls.forEach((url) => {
      mockProgram.coverUrl = url
      const result = normalizeProgramTrack(mockProgram)
      expect(result.mainSong.album.picUrl).toBe(url)
    })
  })

  it('should not mutate the original program object', () => {
    const originalCoverUrl = mockProgram.coverUrl
    const originalAlbumPicUrl = mockProgram.mainSong.album.picUrl

    normalizeProgramTrack(mockProgram)

    expect(mockProgram.coverUrl).toBe(originalCoverUrl)
    expect(mockProgram.mainSong.album.picUrl).toBe(originalAlbumPicUrl)
  })

  it('should return a new object with deep copy of mainSong and album', () => {
    const result = normalizeProgramTrack(mockProgram)

    // Check that mainSong is a new object
    expect(result.mainSong).not.toBe(mockProgram.mainSong)

    // Check that album is a new object
    expect(result.mainSong.album).not.toBe(mockProgram.mainSong.album)

    // Check that other mainSong properties are preserved
    expect(result.mainSong.artists).toBe(mockProgram.mainSong.artists)
  })

  it('should override existing album.picUrl with coverUrl', () => {
    mockProgram.mainSong.album.picUrl = 'https://old-url.com/image.jpg'
    mockProgram.coverUrl = 'https://new-url.com/image.jpg'

    const result = normalizeProgramTrack(mockProgram)

    expect(result.mainSong.album.picUrl).toBe('https://new-url.com/image.jpg')
    expect(result.mainSong.album.picUrl).not.toBe(
      'https://old-url.com/image.jpg'
    )
  })

  it('should handle program with null values in optional fields', () => {
    mockProgram.description = null as unknown as string
    mockProgram.radio = null as unknown as Program['radio']

    const result = normalizeProgramTrack(mockProgram)

    expect(result.description).toBe(null)
    expect(result.radio).toBe(null)
    expect(result.mainSong.album.picUrl).toBe(mockProgram.coverUrl)
  })

  it('should work with program containing multiple songs', () => {
    mockProgram.songs = [
      createMockTrack2({
        id: 789,
        name: 'Song 2',
        duration: 200000,
        album: mockAlbum2,
      }),
      createMockTrack2({
        id: 1011,
        name: 'Song 3',
        duration: 210000,
        album: {
          id: 1011,
          name: 'Album 3',
          artist: mockAlbum2.artist,
          picUrl: 'https://example.com/album3.jpg',
          alias: [],
          publishTime: 1648742400000,
          company: 'Album3 Company',
          description: 'Album3 description',
        },
      }),
    ]

    const result = normalizeProgramTrack(mockProgram)

    // mainSong should be normalized
    expect(result.mainSong.album.picUrl).toBe(mockProgram.coverUrl)

    // songs should not be modified
    expect(result.songs[0].album.picUrl).toBe('https://example.com/album2.jpg')
    expect(result.songs[1].album.picUrl).toBe('https://example.com/album3.jpg')
  })
})
