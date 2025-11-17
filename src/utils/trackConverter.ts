import { Track, Song } from '../types/track'

/**
 * Convert Song to Track
 * @param song Song 对象
 * @returns Track 对象
 */
export function songToTrack(song: Song): Track {
  return {
    id: song.id,
    name: song.name,
    dt: song.duration || 0,
    ar: song.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      tns: [],
      alias: artist.alias || [],
    })),
    al: {
      id: song.album.id,
      name: song.album.name,
      picUrl: song.album.picUrl,
      tns: [],
      alias: [],
    },
    tns: [],
    alia: song.alias || [],
    mv: song.mvid || 0,
  }
}

/**
 * Convert Track to Song
 * @param track Track 对象
 * @returns Song 对象
 */
export function trackToSong(track: Track): Song {
  return {
    id: track.id,
    name: track.name,
    artists: track.ar.map((artist) => ({
      id: artist.id,
      name: artist.name,
      alias: artist.alias,
    })),
    album: {
      id: track.al.id,
      name: track.al.name,
      picUrl: track.al.picUrl,
    },
    duration: track.dt,
    alias: track.alia,
    mvid: track.mv,
  }
}
