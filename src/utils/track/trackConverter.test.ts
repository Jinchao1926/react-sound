import { describe, it, expect } from 'vitest'

import { mockArtist, mockArtist2, mockAlbum } from '@/test/mocks'
import type { Song, Track } from '@/types/track'

import { songToTrack, trackToSong } from './trackConverter'

describe('trackConverter', () => {
  describe('songToTrack', () => {
    it('should convert Song to Track with all fields', () => {
      const song: Song = {
        id: 123,
        name: '江南',
        artists: [mockArtist],
        album: mockAlbum,
        duration: 240000,
        alias: ['Jiangnan'],
        mvid: 456,
      }

      const result: Track = songToTrack(song)

      expect(result).toEqual({
        id: 123,
        name: '江南',
        dt: 240000, // duration -> dt
        ar: [mockArtist], // artists -> ar
        al: mockAlbum, // album -> al
        tns: [], // default empty array
        alia: ['Jiangnan'],
        mv: 456,
      })
    })

    it('should handle missing optional fields', () => {
      const song: Song = {
        id: 123,
        name: '江南',
        artists: [mockArtist],
        album: mockAlbum,
        duration: 240000,
        alias: [],
      }

      const result = songToTrack(song)

      expect(result.mv).toBe(0)
      expect(result.alia).toEqual([])
      expect(result.tns).toEqual([])
    })

    it('should handle undefined alias field', () => {
      const song: Song = {
        id: 123,
        name: '江南',
        artists: [mockArtist],
        album: mockAlbum,
        duration: 240000,
        alias: undefined as unknown as string[],
      }

      const result = songToTrack(song)

      expect(result.alia).toEqual([])
    })

    it('should handle undefined duration', () => {
      const song: Song = {
        id: 123,
        name: '江南',
        artists: [mockArtist],
        album: mockAlbum,
        duration: undefined as unknown as number,
        alias: [],
      }

      const result = songToTrack(song)

      expect(result.dt).toBe(0)
    })

    it('should handle multiple artists', () => {
      const song: Song = {
        id: 123,
        name: '双节棍',
        artists: [mockArtist, mockArtist2],
        album: mockAlbum,
        duration: 180000,
        alias: [],
      }

      const result = songToTrack(song)

      expect(result.ar).toHaveLength(2)
      expect(result.ar[0].name).toBe('林俊杰')
      expect(result.ar[1].name).toBe('张学友')
    })
  })

  describe('trackToSong', () => {
    it('should convert Track to Song', () => {
      const track: Track = {
        id: 123,
        name: '江南',
        dt: 240000,
        ar: [mockArtist],
        al: mockAlbum,
        tns: ['Jiangnan Translation'],
        alia: ['江南地区'],
        mv: 456,
      }

      const result: Song = trackToSong(track)

      expect(result).toEqual({
        id: 123,
        name: '江南',
        artists: [mockArtist], // ar -> artists
        album: mockAlbum, // al -> album
        duration: 240000, // dt -> duration
        alias: ['江南地区'],
        mvid: 456,
      })
    })

    it('should handle Track with no MV', () => {
      const track: Track = {
        id: 123,
        name: '江南',
        dt: 240000,
        ar: [mockArtist],
        al: mockAlbum,
        alia: [],
        mv: 0,
      }

      const result = trackToSong(track)

      expect(result.mvid).toBe(0)
    })

    it('should preserve all artist information', () => {
      const track: Track = {
        id: 123,
        name: '双节棍',
        dt: 180000,
        ar: [mockArtist, mockArtist2],
        al: mockAlbum,
        alia: [],
        mv: 789,
      }

      const result = trackToSong(track)

      expect(result.artists).toHaveLength(2)
      expect(result.artists[0].alias).toEqual(['JJ Lin'])
      expect(result.artists[1].alias).toEqual(['Jacky Cheung'])
    })
  })

  describe('round-trip conversion', () => {
    it('should preserve data through Song -> Track -> Song conversion', () => {
      const originalSong: Song = {
        id: 123,
        name: '江南',
        artists: [mockArtist],
        album: mockAlbum,
        duration: 240000,
        alias: ['Jiangnan'],
        mvid: 456,
      }

      const track = songToTrack(originalSong)
      const convertedSong = trackToSong(track)

      expect(convertedSong.id).toBe(originalSong.id)
      expect(convertedSong.name).toBe(originalSong.name)
      expect(convertedSong.artists).toEqual(originalSong.artists)
      expect(convertedSong.album).toEqual(originalSong.album)
      expect(convertedSong.duration).toBe(originalSong.duration)
      expect(convertedSong.alias).toEqual(originalSong.alias)
      expect(convertedSong.mvid).toBe(originalSong.mvid)
    })
  })
})
