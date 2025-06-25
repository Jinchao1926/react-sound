import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SongOperationBarWrapper } from './style'

interface ITitles {
  collectTitle?: string
  shareTitle?: string
  downloadTitle?: string
  commentTitle?: string
}

interface ICallbacks {
  onPlayClick?: () => void
  onAddClick?: () => void
  onCollectClick?: () => void
  onShareClick?: () => void
  onDownloadClick?: () => void
  onCommentClick?: () => void
}

interface IProps {
  children?: ReactNode
  titles?: ITitles
  callbacks?: ICallbacks
}

const SongOperationBar: FC<IProps> = (props: IProps) => {
  const { titles = {}, callbacks = {} } = props
  const {
    collectTitle = '收藏',
    shareTitle = '分享',
    downloadTitle = '下载',
    commentTitle = '评论',
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
      <button className="play sprite_button" onClick={onPlayClick}>
        播放
      </button>
      <button className="add sprite_button" onClick={onAddClick}></button>
      <button className="collect sprite_button" onClick={onCollectClick}>
        <span className="sprite_button">{collectTitle}</span>
      </button>
      <button className="share sprite_button" onClick={onShareClick}>
        <span className="sprite_button">{shareTitle}</span>
      </button>
      <button className="download sprite_button" onClick={onDownloadClick}>
        <span className="sprite_button">{downloadTitle}</span>
      </button>
      <button className="comment sprite_button" onClick={onCommentClick}>
        <span className="sprite_button">{commentTitle}</span>
      </button>
    </SongOperationBarWrapper>
  )
}

export default memo(SongOperationBar)
