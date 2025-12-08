export const artistRoutePath = {
  artist: '/artist',
  artistSong: '/artist/song',
  artistAlbum: '/artist/album',
  artistMV: '/artist/mv',
  artistDesc: '/artist/desc',
}

export const artistRouteBuilder = {
  artist: (id: number) => `${artistRoutePath.artist}?id=${id}`,
  artistSong: (id: number) => `${artistRoutePath.artistSong}?id=${id}`,
  artistAlbum: (id: number) => `${artistRoutePath.artistAlbum}?id=${id}`,
  artistMV: (id: number) => `${artistRoutePath.artistMV}?id=${id}`,
  artistDesc: (id: number) => `${artistRoutePath.artistDesc}?id=${id}`,
}
