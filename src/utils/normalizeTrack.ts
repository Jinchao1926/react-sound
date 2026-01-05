import { type Track, type Track2 } from '@/types/track'

/**
 * Normalize Track data to ensure consistent artist and album fields
 * @param track original track data
 * @returns normalized track data
 */
export function normalizeTrack(track: Track2): Track {
  const { duration, artists, album, transNames, mvid, ...rest } = track
  return {
    ...rest,
    dt: duration,
    ar: artists,
    al: album,
    tns: transNames,
    mv: mvid,
  }
}

export function normalizeTracks(tracks: Track2[]): Track[] {
  return tracks.map(normalizeTrack)
}
