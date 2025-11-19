import React, { type FC } from 'react'

import { MusicIcon, MusicLink } from './OutchainLink.styles'
import { Flex, Styles } from '../Core'

interface OutchainLinkProps extends Omit<Styles, 'id'> {
  id: number | string
  type: 'playlist' | 'song'
}

export const OutchainLink: FC<OutchainLinkProps> = ({
  id,
  type,
  ...styleProps
}) => {
  const typeNumber = type === 'playlist' ? 0 : 2

  return (
    <Flex align="center" {...styleProps}>
      <MusicIcon />
      <MusicLink
        href={`https://music.163.com/#/outchain/${typeNumber}/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        生成外链播放器
      </MusicLink>
    </Flex>
  )
}
