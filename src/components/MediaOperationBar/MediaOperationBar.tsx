import { type FC } from 'react'

import {
  AddBlueButton,
  AddRedButton,
  PlayBlueButton,
  PlayRedButton,
} from './MediaOperationBar.styles'
import { Flex } from '../Core'
import {
  CollectGreyButton,
  CommentGreyButton,
  DownloadGreyButton,
  ShareGreyButton,
} from '../Shared/Social'

interface MediaOperationBarProps {
  isVIP?: boolean
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
  isVIP = false,
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

  const playTitle = isVIP ? 'VIP尊享' : '播放'
  const PlayButton = isVIP ? PlayRedButton : PlayBlueButton
  const AddButton = isVIP ? AddRedButton : AddBlueButton

  return (
    <Flex align="center" gap={6}>
      <Flex>
        <PlayButton onClick={onPlayClick}>{playTitle}</PlayButton>
        <AddButton onClick={onAddClick} />
      </Flex>

      <CollectGreyButton count={collect} onClick={onCollectClick} />
      <ShareGreyButton count={share} onClick={onShareClick} />
      <DownloadGreyButton count={download} onClick={onDownloadClick} />
      <CommentGreyButton count={comment} onClick={onCommentClick} />
    </Flex>
  )
}
