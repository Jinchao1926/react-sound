import { type ButtonHTMLAttributes, type FC } from 'react'

import { formatPlayCount } from '@/utils/dataFormat'

import { LikedIcon, PlayBlueButton2, StarButton } from './Social.styles'
import { SpriteGreyButton } from '../Buttons'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number
  title?: string
  hasPrefix?: boolean
}

// Play
export const PlayBlueButton: FC<SocialButtonProps> = ({
  count,
  title = '播放',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <PlayBlueButton2 {...rest}>
      {count ? `(${prefix}${formatPlayCount(count)})` : title}
    </PlayBlueButton2>
  )
}

export const PlayGreyButton: FC<SocialButtonProps> = ({
  count,
  title = '播放',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <SpriteGreyButton icon="playGrey" padding="0 7px 0 32px" {...rest}>
      {count ? `(${prefix}${formatPlayCount(count)})` : title}
    </SpriteGreyButton>
  )
}

// Subscribe
export const SubscribeBlueButton: FC<SocialButtonProps> = ({
  count,
  title = '订阅',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <StarButton {...rest}>
      {count ? `(${prefix}${formatPlayCount(count)})` : title}
    </StarButton>
  )
}

// Like
export const LikeGreyButton: FC<SocialButtonProps> = ({
  count,
  title = '赞',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <SpriteGreyButton icon="grey" padding="0 2px 0 10px" {...rest}>
      <LikedIcon $liked={false} />
      {count ? `(${prefix}${formatPlayCount(count)})` : title}
    </SpriteGreyButton>
  )
}

// Collect
export const CollectGreyButton: FC<SocialButtonProps> = ({
  count,
  title = '收藏',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <SpriteGreyButton icon="collectGrey" {...rest}>
      {count ? `${prefix}(${formatPlayCount(count)})` : title}
    </SpriteGreyButton>
  )
}

// Comment
export const CommentGreyButton: FC<SocialButtonProps> = ({
  count,
  title = '评论',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <SpriteGreyButton icon="commentGrey" {...rest}>
      {count ? `${prefix}(${formatPlayCount(count)})` : title}
    </SpriteGreyButton>
  )
}

// Share
export const ShareGreyButton: FC<SocialButtonProps> = ({
  count,
  title = '分享',
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? title : ''
  return (
    <SpriteGreyButton icon="shareGrey" {...rest}>
      {count ? `${prefix}(${formatPlayCount(count)})` : title}
    </SpriteGreyButton>
  )
}

// Download
export const DownloadGreyButton: FC<SocialButtonProps> = ({
  count,
  hasPrefix,
  ...rest
}) => {
  const prefix = hasPrefix ? '下载' : ''
  return (
    <SpriteGreyButton icon="downloadGrey" {...rest}>
      {count ? `${prefix}(${formatPlayCount(count)})` : '下载'}
    </SpriteGreyButton>
  )
}
