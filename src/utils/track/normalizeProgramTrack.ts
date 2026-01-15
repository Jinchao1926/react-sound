import { type Program } from '@/types/program'

/**
 * Normalize program cover URL by setting it to mainSong.album.picUrl
 */
export const normalizeProgramTrack = (program: Program): Program => {
  const coverUrl = program.coverUrl
  return {
    ...program,
    mainSong: {
      ...program.mainSong,
      album: {
        ...program.mainSong.album,
        picUrl: coverUrl,
      },
    },
  }
}
