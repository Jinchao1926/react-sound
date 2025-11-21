import React, { type FC } from 'react'

import { formatPlayCount } from '@/utils/dataFormat'

import { AddBlueButton, PlayBlueButton } from './MediaOperationBar.styles'
import { GreyButton } from '../Buttons'
import { Flex } from '../Core'

interface MediaOperationBarProps {
  counts?: {
    collect?: number
    share?: number
    download?: number
    comment?: number
  }
  callbacks?: {
    onPlayClick?: () => void
    onAddClick?: () => void
    onCollectClick?: () => void
    onShareClick?: () => void
    onDownloadClick?: () => void
    onCommentClick?: () => void
  }
}

export const MediaOperationBar: FC<MediaOperationBarProps> = ({
  counts = {},
  callbacks = {},
}: MediaOperationBarProps) => {
  const { collect, share, download, comment } = counts
  const {
    onPlayClick,
    onAddClick,
    onCollectClick,
    onShareClick,
    onDownloadClick,
    onCommentClick,
  } = callbacks

  return (
    <Flex align="center">
      <PlayBlueButton onClick={onPlayClick}>播放</PlayBlueButton>
      <AddBlueButton onClick={onAddClick} />

      <GreyButton icon="collectGrey" onClick={onCollectClick}>
        {collect ? `(${formatPlayCount(collect)})` : '收藏'}
      </GreyButton>
      <GreyButton icon="shareGrey" onClick={onShareClick}>
        {share ? `(${formatPlayCount(share)})` : '分享'}
      </GreyButton>
      <GreyButton icon="downloadGrey" onClick={onDownloadClick}>
        {download ? `(${formatPlayCount(download)})` : '下载'}
      </GreyButton>
      <GreyButton icon="commentGrey" onClick={onCommentClick}>
        {comment ? `(${formatPlayCount(comment)})` : '评论'}
      </GreyButton>
    </Flex>
  )
}
