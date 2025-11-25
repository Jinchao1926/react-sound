import React, { type FC } from 'react'

import { MusicIcon, MusicLink } from './ExternalLink.styles'
import { Flex, Styles } from '../Core'

export type ExternalLinkType = 'playlist' | 'album' | 'song'
interface ExternalLinkProps extends Omit<Styles, 'id'> {
  id: number | string
  type: ExternalLinkType
}

export const ExternalLink: FC<ExternalLinkProps> = ({
  id,
  type,
  ...styleProps
}) => {
  const typeMapping = {
    playlist: 0,
    album: 1,
    song: 2,
  }

  return (
    <Flex align="center" {...styleProps}>
      <MusicIcon />
      <MusicLink
        href={`https://music.163.com/#/outchain/${typeMapping[type]}/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        生成外链播放器
      </MusicLink>
    </Flex>
  )
}
