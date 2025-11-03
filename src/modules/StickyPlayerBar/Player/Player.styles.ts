import styled from 'styled-components'

import { CoverImage } from '@/components/CoverImage'

export const SongCoverImage = styled(CoverImage).attrs({
  size: 34,
  coverSprite: 'playbar',
  coverIcon: 'cover',
})``

export const PlayerProgressBar = styled.div`
  position: relative;
`

export const PlayerTime = styled.span`
  position: absolute;
  top: -3px;
  left: 480px;
  color: #797979;
  text-shadow: 0 1px 0 #121212;
`

export const PlayerTimeNow = styled.span`
  color: #a1a1a1;
`
