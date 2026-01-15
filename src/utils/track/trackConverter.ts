import { type Track, type Song } from '@/types/track'

/**
 * Convert Song to Track
 * @param song Song object
 * @returns Track object
 */
export function songToTrack(song: Song): Track {
  return {
    id: song.id,
    name: song.name,
    dt: song.duration || 0,
    ar: song.artists,
    al: song.album,
    tns: [],
    alia: song.alias || [],
    mv: song.mvid || 0,
  }
}

/**
 * Convert Track to Song
 * @param track Track object
 * @returns Song object
 */
export function trackToSong(track: Track): Song {
  return {
    id: track.id,
    name: track.name,
    artists: track.ar,
    album: track.al,
    duration: track.dt,
    alias: track.alia,
    mvid: track.mv,
  }
}
