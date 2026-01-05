import {
  type ArtistArea,
  type ArtistType,
} from '@/hooks/artist/useArtistListQuery'

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
    return category !== undefined
      ? `${discoverRoutePath.discoverPlaylist}?cat=${category}`
      : discoverRoutePath.discoverPlaylist
  },
  discoverArtist: (options?: {
    area?: ArtistArea
    type?: ArtistType
    initial?: number
  }) => {
    const { area, type, initial } = options || {}
    const params = new URLSearchParams()
    if (area !== undefined) params.append('area', String(area))
    if (type !== undefined) params.append('type', String(type))
    if (initial !== undefined) params.append('initial', String(initial))

    const queryString = params.toString()
    return queryString
      ? `${discoverRoutePath.discoverArtist}?${queryString}`
      : discoverRoutePath.discoverArtist
  },
  discoverAlbum: () => discoverRoutePath.discoverAlbum,
}
