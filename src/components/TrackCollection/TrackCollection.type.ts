import { Track } from '@/types/track'

import { OutchainType } from '../Links/OutchainLink'

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
  showOutchainLink?: boolean
  outchainType?: OutchainType
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
