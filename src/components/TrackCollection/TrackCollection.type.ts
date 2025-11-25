import { Track } from '@/types/track'

import { ExternalLinkType } from '../Links'

export interface TrackSource {
  id: number
  name: string
  tracks: Track[]
  trackCount: number
  playCount?: number
}

export interface TrackCollectionConfig {
  maxRows?: number
  headerTitle?: string
  showExternalLink?: boolean
  externalLinkType?: ExternalLinkType
  showAlbumColumn?: boolean
  showIndexTrend?: boolean
  showTitleCoverImage?: boolean
  columnWidths: {
    index?: number
    title?: number
    duration?: number
    artist?: number
    album?: number
  }
}
