import { FeeType, type Track, type Track2 } from '@/types/track'

/**
 * Check if a track requires VIP membership or payment
 * @param track - Track object to check
 * @returns true if track requires VIP/payment, false if free
 */
export function isVIPTrack(track: Track | Track2): boolean {
  if (!track.fee) {
    return false
  }
  return track.fee === FeeType.VIP || track.fee === FeeType.AlbumPurchase
}
