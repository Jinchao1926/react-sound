import { Track, Track2 } from '@/types/track'

/**
 * Normalize Track data to ensure consistent artist and album fields
 * @param track original track data
 * @returns normalized track data
 */
export function normalizeTrack(track: Track2): Track {
  const { duration, artists, album, mvid, ...rest } = track
  return {
    ...rest,
    dt: duration,
    ar: artists,
    al: album,
    mv: mvid,
  }
}

export function normalizeTracks(tracks: Track2[]): Track[] {
  return tracks.map(normalizeTrack)
}
