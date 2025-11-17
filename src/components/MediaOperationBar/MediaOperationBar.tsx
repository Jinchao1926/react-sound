import React, { type FC } from 'react'

import {
  AddBlueButton,
  PlayBlueButton,
  SongOperationBarWrapper,
} from './MediaOperationBar.styles'
import { GreyButton } from '../GreyButton'

interface MediaOperationBarProps {
  titles?: {
    collect?: string
    share?: string
    download?: string
    comment?: string
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
  titles = {},
  callbacks = {},
}: MediaOperationBarProps) => {
  const {
    collect = '收藏',
    share = '分享',
    download = '下载',
    comment = '评论',
  } = titles
  const {
    onPlayClick,
    onAddClick,
    onCollectClick,
    onShareClick,
    onDownloadClick,
    onCommentClick,
  } = callbacks

  return (
    <SongOperationBarWrapper>
      <PlayBlueButton onClick={onPlayClick}>播放</PlayBlueButton>
      <AddBlueButton onClick={onAddClick} />

      <GreyButton icon="collectGrey" onClick={onCollectClick}>
        {collect}
      </GreyButton>
      <GreyButton icon="shareGrey" onClick={onShareClick}>
        {share}
      </GreyButton>
      <GreyButton icon="downloadGrey" onClick={onDownloadClick}>
        {download}
      </GreyButton>
      <GreyButton icon="commentGrey" onClick={onCommentClick}>
        {comment}
      </GreyButton>
    </SongOperationBarWrapper>
  )
}
