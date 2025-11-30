export const detailRoutePath = {
  playlist: '/playlist',
  album: '/album',
  song: '/song',
  radio: '/djradio',
  program: '/program',
  mv: '/mv',
  artist: '/artist',
  user: '/user/home',
}

export const detailRouteBuilder = {
  playlist: (id: number) => `${detailRoutePath.playlist}?id=${id}`,
  album: (id: number) => `${detailRoutePath.album}?id=${id}`,
  song: (id: number) => `${detailRoutePath.song}?id=${id}`,
  radio: (id: number) => `${detailRoutePath.radio}?id=${id}`,
  program: (id: number) => `${detailRoutePath.program}?id=${id}`,
  mv: (id: number) => `${detailRoutePath.mv}?id=${id}`,
  artist: (id: number) => `${detailRoutePath.artist}?id=${id}`,
  user: (id: number) => `${detailRoutePath.user}?id=${id}`,
}
