export const discoverRoutePath = {
  discover: '/discover',
  discoverRecommend: '/discover/recommend',
  discoverToplist: '/discover/toplist',
  discoverPlaylist: '/discover/playlist',
  discoverArtist: '/discover/artist',
  discoverAlbum: '/discover/album',
}

export const discoverRouteBuilder = {
  discover: () => discoverRoutePath.discover,
  discoverRecommend: () => discoverRoutePath.discoverRecommend,
  discoverToplist: (id?: number) => {
    return id
      ? `${discoverRoutePath.discoverToplist}?id=${id}`
      : discoverRoutePath.discoverToplist
  },
  discoverPlaylist: (category?: string) => {
    return category
      ? `${discoverRoutePath.discoverPlaylist}?cat=${category}`
      : discoverRoutePath.discoverPlaylist
  },
  discoverArtist: (id: number) =>
    `${discoverRoutePath.discoverArtist}?id=${id}`,
  discoverAlbum: () => discoverRoutePath.discoverAlbum,
}
