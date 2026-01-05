import { type Track } from '@/types/track'

import { type ExternalLinkType } from '../Links'

export interface TrackSource {
  id?: number
  name?: string
  tracks: Track[]
  trackCount?: number
  playCount?: number
}

export interface TrackCollectionConfig {
  maxRows?: number
  headerTitle?: string
  showExpandableHeader?: boolean
  showExternalLink?: boolean
  externalLinkType?: ExternalLinkType
  showArtistColumn?: boolean
  showAlbumColumn?: boolean
  showIndexTrend?: boolean
  showTitleCoverImage?: boolean
  columnWidths?: {
    index?: number
    title?: number
    duration?: number
    artist?: number
    album?: number
  }
}
