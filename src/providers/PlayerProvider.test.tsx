import type { ReactNode } from 'react'

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mockTrack } from '@/test/mocks'

import { PlayerProvider, usePlayerContext } from './PlayerProvider'

// Mock PlayerStorage
vi.mock('../utils/storages/playerStorage', () => ({
  PlayerStorage: {
    getPlaylist: vi.fn(() => []),
    setPlaylist: vi.fn(() => true),
    getPlayMode: vi.fn(() => 'loop'),
    setPlayMode: vi.fn(() => true),
    getPlayerPinned: vi.fn(() => false),
    setPlayerPinned: vi.fn(() => true),
    getCurrentSongIndex: vi.fn(() => undefined),
    setCurrentSongIndex: vi.fn(() => true),
  },
}))

// Mock useSongLyricQuery
vi.mock('@/hooks/song/useSongLyricQuery', () => ({
  useSongLyricQuery: vi.fn(() => ({ data: [] })),
}))

describe('PlayerProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <PlayerProvider>{children}</PlayerProvider>
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      expect(result.current.state.playlist).toEqual([])
      expect(result.current.state.playMode).toBe('loop')
      expect(result.current.state.isPinned).toBe(false)
      expect(result.current.state.isPlaying).toBe(false)
      expect(result.current.state.currentTrack).toBeUndefined()
      expect(result.current.state.currentTrackIndex).toBeUndefined()
    })
  })

  describe('Playlist Management', () => {
    it('should add track to playlist', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.addToPlaylist(mockTrack)
      })

      expect(result.current.state.playlist).toContainEqual(mockTrack)
      expect(result.current.state.playlist).toHaveLength(1)
    })

    it('should not add duplicate tracks', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.addToPlaylist(mockTrack)
        result.current.addToPlaylist(mockTrack)
      })

      expect(result.current.state.playlist).toHaveLength(1)
    })

    it('should add multiple tracks to playlist', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      act(() => {
        result.current.addTracksToPlaylist(tracks)
      })

      expect(result.current.state.playlist).toHaveLength(2)
    })

    it('should remove track from playlist', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.addToPlaylist(mockTrack)
      })

      expect(result.current.state.playlist).toHaveLength(1)

      act(() => {
        result.current.removeFromPlaylist(mockTrack.id)
      })

      expect(result.current.state.playlist).toHaveLength(0)
    })

    it('should clear entire playlist', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.addToPlaylist(mockTrack)
      })

      expect(result.current.state.playlist).toHaveLength(1)

      act(() => {
        result.current.clearPlaylist()
      })

      expect(result.current.state.playlist).toHaveLength(0)
    })
  })

  describe('Playback Control', () => {
    it('should play a track', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.playTrack(mockTrack)
      })

      expect(result.current.state.currentTrack).toEqual(mockTrack)
      expect(result.current.state.isPlaying).toBe(true)
      expect(result.current.state.currentTrackIndex).toBe(0)
    })

    it('should play multiple tracks starting at index 0', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      act(() => {
        result.current.playTracks(tracks)
      })

      expect(result.current.state.playlist).toEqual(tracks)
      expect(result.current.state.currentTrack).toEqual(tracks[0])
      expect(result.current.state.currentTrackIndex).toBe(0)
      expect(result.current.state.isPlaying).toBe(true)
    })

    it('should play multiple tracks starting at specific index', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [
        mockTrack,
        { ...mockTrack, id: 456, name: 'Track 2' },
        { ...mockTrack, id: 789, name: 'Track 3' },
      ]

      act(() => {
        result.current.playTracks(tracks, 1)
      })

      expect(result.current.state.currentTrack).toEqual(tracks[1])
      expect(result.current.state.currentTrackIndex).toBe(1)
    })

    it('should toggle play state', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      expect(result.current.state.isPlaying).toBe(false)

      act(() => {
        result.current.togglePlayState()
      })

      expect(result.current.state.isPlaying).toBe(true)

      act(() => {
        result.current.togglePlayState()
      })

      expect(result.current.state.isPlaying).toBe(false)
    })

    it('should switch to next track in loop mode', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      act(() => {
        result.current.playTracks(tracks, 0)
      })

      act(() => {
        result.current.switchTrack(true)
      })

      expect(result.current.state.currentTrack).toEqual(tracks[1])
      expect(result.current.state.currentTrackIndex).toBe(1)
    })

    it('should loop to first track when at end', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      act(() => {
        result.current.playTracks(tracks, 1)
      })

      act(() => {
        result.current.switchTrack(true)
      })

      expect(result.current.state.currentTrackIndex).toBe(0)
    })

    it('should switch to previous track', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      act(() => {
        result.current.playTracks(tracks, 1)
      })

      act(() => {
        result.current.switchTrack(false)
      })

      expect(result.current.state.currentTrackIndex).toBe(0)
    })
  })

  describe('Play Mode', () => {
    it('should switch play mode', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      expect(result.current.state.playMode).toBe('loop')

      act(() => {
        result.current.switchPlayMode()
      })

      // getNextPlayMode should have been called and changed the mode
      expect(result.current.state.playMode).not.toBe('loop')
    })
  })

  describe('UI Control', () => {
    it('should toggle pinned state', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      expect(result.current.state.isPinned).toBe(false)

      act(() => {
        result.current.togglePinned()
      })

      expect(result.current.state.isPinned).toBe(true)

      act(() => {
        result.current.togglePinned()
      })

      expect(result.current.state.isPinned).toBe(false)
    })
  })

  describe('Lyric Control', () => {
    it('should change lyric line index', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      // Set up state with current lyric
      act(() => {
        result.current.playTrack(mockTrack)
      })

      // This would normally be set by useSongLyricQuery, but we'll test the function directly
      act(() => {
        result.current.changeLyricLineIndex(1)
      })

      // Since there's no current lyric, it should return previous state
      expect(result.current.state.currentLyricLineIndex).toBe(0)
    })

    it('should clamp lyric index to valid range', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })

      act(() => {
        result.current.changeLyricLineIndex(-1)
      })

      // Should clamp to 0 even when there's no lyric
      expect(result.current.state.currentLyricLineIndex).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should throw error when usePlayerContext is used outside provider', () => {
      expect(() => {
        renderHook(() => usePlayerContext())
      }).toThrow('usePlayerContext must be used within a PlayerProvider')
    })

    it('should handle playTracks with empty array', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const initialState = { ...result.current.state }

      act(() => {
        result.current.playTracks([])
      })

      // State should not change
      expect(result.current.state).toEqual(initialState)
    })

    it('should handle invalid start index for playTracks', () => {
      const { result } = renderHook(() => usePlayerContext(), { wrapper })
      const tracks = [mockTrack, { ...mockTrack, id: 456, name: 'Track 2' }]

      // Test with index larger than array
      act(() => {
        result.current.playTracks(tracks, 10)
      })

      expect(result.current.state.currentTrackIndex).toBe(1) // Should clamp to last index

      // Test with negative index
      act(() => {
        result.current.playTracks(tracks, -5)
      })

      expect(result.current.state.currentTrackIndex).toBe(0) // Should clamp to 0
    })
  })
})
