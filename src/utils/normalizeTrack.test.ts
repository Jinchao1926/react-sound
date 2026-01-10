import { describe, it, expect } from 'vitest'

import type { Album, Artist } from '@/types/music'
import type { Track, Track2 } from '@/types/track'

import { normalizeTrack, normalizeTracks } from './normalizeTrack'

describe('normalizeTrack', () => {
  const mockArtist: Artist = {
    id: 1,
    accountId: 123,
    name: '林俊杰',
    img1v1Url: 'https://example.com/img1v1.jpg',
    picUrl: 'https://example.com/pic.jpg',
    alias: ['JJ Lin'],
  }

  const mockAlbum: Album = {
    id: 100,
    name: '西界',
    artist: mockArtist,
    picUrl: 'https://example.com/album.jpg',
    alias: [],
    publishTime: 1648742400000,
    company: 'JFJ Productions',
    description: 'Album description',
  }

  describe('normalizeTrack', () => {
    it('should convert Track2 to Track', () => {
      const track2: Track2 = {
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

      const result: Track = normalizeTrack(track2)

      expect(result).toEqual({
        id: 123,
        name: '江南',
        dt: 240000, // duration -> dt
        ar: [mockArtist], // artists -> ar
        al: mockAlbum, // album -> al
        tns: ['Jiangnan'], // transNames -> tns
        mv: 456, // mvid -> mv
        alia: ['江南地区'],
      })
    })

    it('should handle undefined transNames', () => {
      const track2: Track2 = {
        id: 123,
        name: '江南',
        duration: 240000,
        artists: [mockArtist],
        album: mockAlbum,
        mvid: 0,
        dt: 240000,
        alia: [],
        mv: 0,
      }

      const result = normalizeTrack(track2)

      expect(result.tns).toBeUndefined()
    })

    it('should handle multiple artists', () => {
      const artist2: Artist = {
        id: 2,
        accountId: 456,
        name: '张学友',
        img1v1Url: 'https://example.com/img2.jpg',
        picUrl: 'https://example.com/pic2.jpg',
        alias: [],
      }

      const track2: Track2 = {
        id: 123,
        name: '双节棍',
        duration: 180000,
        artists: [mockArtist, artist2],
        album: mockAlbum,
        mvid: 789,
        dt: 180000,
        tns: [],
        alia: [],
        mv: 0,
      }

      const result = normalizeTrack(track2)

      expect(result.ar).toHaveLength(2)
      expect(result.ar[0]).toEqual(mockArtist)
      expect(result.ar[1]).toEqual(artist2)
    })
  })

  describe('normalizeTracks', () => {
    it('should convert array of Track2 to array of Track', () => {
      const tracks2: Track2[] = [
        {
          id: 1,
          name: 'Song 1',
          duration: 180000,
          artists: [mockArtist],
          album: mockAlbum,
          mvid: 100,
          dt: 180000,
          tns: [],
          alia: [],
          mv: 0,
        },
        {
          id: 2,
          name: 'Song 2',
          duration: 200000,
          artists: [mockArtist],
          album: mockAlbum,
          mvid: 200,
          dt: 200000,
          tns: [],
          alia: [],
          mv: 0,
        },
      ]

      const result = normalizeTracks(tracks2)

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(1)
      expect(result[0].dt).toBe(180000)
      expect(result[0].mv).toBe(100)
      expect(result[1].id).toBe(2)
      expect(result[1].dt).toBe(200000)
      expect(result[1].mv).toBe(200)
    })

    it('should handle empty array', () => {
      const result = normalizeTracks([])

      expect(result).toEqual([])
    })
  })
})
