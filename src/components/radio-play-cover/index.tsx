import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { formatSizedImage } from '@/utils/format-utils'

import { RadioPlayCoverWrapper } from './style'

interface IProps {
  children?: ReactNode
  coverUrl: string
  onPlayClick?: () => void
}

const RadioPlayCover: FC<IProps> = (props: IProps) => {
  const { coverUrl, onPlayClick } = props
  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick()
    }
  }

  return (
    <RadioPlayCoverWrapper className="radio-cover">
      <img src={formatSizedImage(coverUrl, 40)} alt="" />
      <button
        className="play sprite_icon"
        title="播放"
        onClick={handlePlayClick}
      />
    </RadioPlayCoverWrapper>
  )
}

export default memo(RadioPlayCover)
