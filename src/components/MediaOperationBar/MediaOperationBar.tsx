import React, { type FC } from 'react'

import { AddBlueButton, PlayBlueButton } from './MediaOperationBar.styles'
import { Flex } from '../Core'
import {
  CollectGreyButton,
  CommentGreyButton,
  DownloadGreyButton,
  ShareGreyButton,
} from '../Shared/Social'

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
    <Flex align="center" gap={6}>
      <Flex>
        <PlayBlueButton onClick={onPlayClick}>播放</PlayBlueButton>
        <AddBlueButton onClick={onAddClick} />
      </Flex>

      <CollectGreyButton count={collect} onClick={onCollectClick} />
      <ShareGreyButton count={share} onClick={onShareClick} />
      <DownloadGreyButton count={download} onClick={onDownloadClick} />
      <CommentGreyButton count={comment} onClick={onCommentClick} />
    </Flex>
  )
}
