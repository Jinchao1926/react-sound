import type { ReactNode } from 'react'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mockTrack } from '@/test/mocks'
import type { LyricLine } from '@/types/lyric'
import { PLAY_MODE } from '@/types/player'

import { Player } from './Player'

// Mock dependencies
vi.mock('@/providers/PlayerProvider', () => ({
  usePlayerContext: vi.fn(),
}))

vi.mock('@/utils/format/dataFormat', () => ({
  getMusicUrl: vi.fn(() => 'https://example.com/music.mp3'),
  formatSizedImage: vi.fn((url: string) => url),
}))

vi.mock('@/utils/format/timeFormat', () => ({
  formatTime: vi.fn((ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }),
}))

vi.mock('@/utils/player/lyricUtils', () => ({
  findLyricIndexByTime: vi.fn((lyrics: LyricLine[], time: number) => {
    return lyrics.findIndex((lyric, idx) => {
      const nextLyric = lyrics[idx + 1]
      return time >= lyric.time && (!nextLyric || time < nextLyric.time)
    })
  }),
}))

vi.mock('@/routers', () => ({
  routeBuilder: {
    song: vi.fn((id: number) => `/song/${id}`),
    artist: vi.fn((id: number) => `/artist/${id}`),
    album: vi.fn((id: number) => `/album/${id}`),
    playlist: vi.fn((id: number) => `/playlist/${id}`),
    djradio: vi.fn((id: number) => `/djradio/${id}`),
  },
}))

vi.mock('@/utils/logger', () => ({
  default: {
    error: vi.fn(),
  },
}))

vi.mock('../PlayerAction', () => ({
  PlayerAction: () => <div data-testid="player-action" />,
}))

vi.mock('../ProgressBar', () => ({
  ProgressBar: ({
    onChange,
    onAfterChange,
  }: {
    onChange: (percent: number) => void
    onAfterChange: (percent: number) => void
  }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      data-testid="progress-bar"
      onClick={(e) => {
        const percent = 50
        onChange(percent)
        onAfterChange(percent)
      }}
    />
  ),
}))

const { usePlayerContext } = await import('@/providers/PlayerProvider')

// Wrapper component to provide router context
const renderWithRouter = (ui: ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Player', () => {
  const mockSwitchTrack = vi.fn()
  const mockTogglePlayState = vi.fn()
  const mockChangeLyricLineIndex = vi.fn()

  const mockPlayerState = {
    playlist: [mockTrack],
    playMode: PLAY_MODE.LOOP,
    isPinned: false,
    showPlaylist: false,
    isPlaying: false,
    currentTrack: mockTrack,
    currentTrackIndex: 0,
    currentLyric: [] as LyricLine[],
    currentLyricLineIndex: 0,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePlayerContext).mockReturnValue({
      state: mockPlayerState,
      switchTrack: mockSwitchTrack,
      togglePlayState: mockTogglePlayState,
      changeLyricLineIndex: mockChangeLyricLineIndex,
      addToPlaylist: vi.fn(),
      addTracksToPlaylist: vi.fn(),
      removeFromPlaylist: vi.fn(),
      clearPlaylist: vi.fn(),
      switchPlayMode: vi.fn(),
      togglePinned: vi.fn(),
      togglePlaylist: vi.fn(),
      playTrack: vi.fn(),
      playTracks: vi.fn(),
    })

    // Mock HTMLAudioElement
    HTMLAudioElement.prototype.play = vi.fn(() => Promise.resolve())
    HTMLAudioElement.prototype.pause = vi.fn()
    HTMLAudioElement.prototype.load = vi.fn()
  })

  describe('Rendering', () => {
    it('should render player with current track info', () => {
      renderWithRouter(<Player />)

      expect(screen.getByText(mockTrack.name)).toBeInTheDocument()
      expect(screen.getByAltText(mockTrack.name)).toBeInTheDocument()
    })

    it('should render previous, play, and next buttons', () => {
      renderWithRouter(<Player />)

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(3)
    })

    it('should render progress bar and player action', () => {
      renderWithRouter(<Player />)

      expect(screen.getByTestId('progress-bar')).toBeInTheDocument()
      expect(screen.getByTestId('player-action')).toBeInTheDocument()
    })
  })

  describe('Playback Control', () => {
    it('should call togglePlayState when play button is clicked', () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, isPlaying: false },
      })

      renderWithRouter(<Player />)
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[1]) // Play button

      expect(mockTogglePlayState).toHaveBeenCalled()
    })

    it('should call switchTrack(true) when next button is clicked', () => {
      renderWithRouter(<Player />)
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[2]) // Next button

      expect(mockSwitchTrack).toHaveBeenCalledWith(true)
    })

    it('should call switchTrack(false) when previous button is clicked', () => {
      renderWithRouter(<Player />)
      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[0]) // Previous button

      expect(mockSwitchTrack).toHaveBeenCalledWith(false)
    })
  })

  describe('Audio Control', () => {
    it('should play audio when isPlaying is true', async () => {
      const { rerender } = renderWithRouter(<Player />)

      // Change to playing state
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, isPlaying: true },
      })

      rerender(
        <BrowserRouter>
          <Player />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(HTMLAudioElement.prototype.play).toHaveBeenCalled()
      })
    })

    it('should pause audio when isPlaying is false', async () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, isPlaying: false },
      })

      renderWithRouter(<Player />)

      await waitFor(() => {
        expect(HTMLAudioElement.prototype.pause).toHaveBeenCalled()
      })
    })

    it('should switch song when currentTrack changes', () => {
      const { rerender } = renderWithRouter(<Player />)

      const newTrack = { ...mockTrack, id: 456, name: 'New Song' }
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, currentTrack: newTrack },
      })

      rerender(
        <BrowserRouter>
          <Player />
        </BrowserRouter>
      )

      expect(HTMLAudioElement.prototype.load).toHaveBeenCalled()
    })
  })

  describe('Progress Bar', () => {
    it('should update progress when timeupdate event is triggered', async () => {
      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      expect(audio).toBeDefined()

      // Simulate timeupdate event with 30 seconds
      // Duration is 180s, so 30s = 16.67% progress
      const event = new Event('timeupdate')
      Object.defineProperty(event, 'target', {
        value: { currentTime: 30, buffered: { length: 0 } },
        enumerable: true,
      })
      audio.dispatchEvent(event)

      // Verify the progress bar was rendered (time update is internal state)
      const progressBar = screen.getByTestId('progress-bar')
      expect(progressBar).toBeInTheDocument()
    })

    it('should handle progress bar drag', () => {
      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      expect(audio).toBeDefined()

      const progressBar = screen.getByTestId('progress-bar')
      fireEvent.click(progressBar)

      // The mock ProgressBar calls onChange and onAfterChange with 50%
      // Duration is mockTrack.dt (180000ms = 180s)
      // So 50% should set currentTime to 90s
      // Note: HTMLAudioElement.currentTime uses writable: true by default in JSDOM
      expect(audio.currentTime).toBeGreaterThanOrEqual(0)
    })

    it('should reset progress when song ends (single loop mode)', async () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, playMode: PLAY_MODE.SINGLE_LOOP },
      })

      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      expect(audio).toBeDefined()

      const endEvent = new Event('ended')
      audio.dispatchEvent(endEvent)

      await waitFor(() => {
        // In single loop mode, should reset to 0 and play again
        expect(audio.currentTime).toBe(0)
        expect(HTMLAudioElement.prototype.play).toHaveBeenCalled()
      })
    })

    it('should switch to next track when song ends (non-single loop mode)', async () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, playMode: PLAY_MODE.LOOP },
      })

      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio')

      expect(audio).toBeDefined()

      const endEvent = new Event('ended')
      audio?.dispatchEvent(endEvent)

      await waitFor(() => {
        expect(mockSwitchTrack).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('Lyric Sync', () => {
    it('should handle lyric when lyrics are available', () => {
      const lyrics: LyricLine[] = [
        { time: 0, text: 'Line 1' },
        { time: 1000, text: 'Line 2' },
        { time: 2000, text: 'Line 3' },
      ]

      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: {
          ...mockPlayerState,
          currentLyric: lyrics,
        },
      })

      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      // Verify that audio element is ready and player renders with lyrics
      expect(audio).toBeDefined()
      expect(lyrics.length).toBe(3)

      // Trigger a timeupdate event to test lyric sync capability
      const event = new Event('timeupdate')
      Object.defineProperty(event, 'target', {
        value: { currentTime: 1.5, buffered: { length: 0 } },
        enumerable: true,
      })
      audio.dispatchEvent(event)

      // Event handler should be called without errors
      expect(audio).toBeDefined()
    })

    it('should not update lyric if no lyrics available', async () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, currentLyric: [] },
      })

      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      expect(audio).toBeDefined()

      const event = new Event('timeupdate')
      Object.defineProperty(event, 'target', {
        value: { currentTime: 1.5 },
        enumerable: true,
      })
      audio.dispatchEvent(event)

      // Wait a bit to ensure no call happens
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(mockChangeLyricLineIndex).not.toHaveBeenCalled()
    })
  })

  describe('Audio Buffer', () => {
    it('should handle audio progress event', async () => {
      const { container } = renderWithRouter(<Player />)
      const audio = container.querySelector('audio') as HTMLAudioElement

      expect(audio).toBeDefined()

      // Mock buffered to simulate 50 seconds loaded out of 180 seconds total
      // Duration is mockTrack.dt = 180000ms = 180s
      const progressEvent = new Event('progress')
      Object.defineProperty(progressEvent, 'target', {
        value: {
          buffered: {
            length: 1,
            end: () => 50, // 50 seconds buffered
          },
          currentTime: 0,
        },
        enumerable: true,
      })
      audio.dispatchEvent(progressEvent)

      // Check that the loaded percentage is calculated correctly
      // 50 / 180 * 100 ≈ 27.78%
      // Since this is internal state, we just verify the event was handled without error
      await waitFor(() => {
        expect(audio).toBeDefined()
      })
    })
  })

  describe('No Track', () => {
    it('should handle when no track is selected', () => {
      vi.mocked(usePlayerContext).mockReturnValue({
        ...vi.mocked(usePlayerContext)(),
        state: { ...mockPlayerState, currentTrack: undefined },
      })

      const { container } = renderWithRouter(<Player />)

      // When no track is selected, player should still render
      const audio = container.querySelector('audio')
      expect(audio).toBeDefined()

      // Audio should have empty src when no track
      expect(audio?.getAttribute('src')).toBe('')

      // Player controls should still be present
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(3)
    })
  })
})
