import type { FC } from 'react'

import { formatSizedImage } from '@/utils/format-utils'

import { ProgramCoverWrapper } from './ProgramCover.styles'

interface ProgramCoverProps {
  coverUrl: string
  onPlayClick?: () => void
}

export const ProgramCover: FC<ProgramCoverProps> = ({
  coverUrl,
  onPlayClick,
}) => {
  return (
    <ProgramCoverWrapper className="radio-cover">
      <img src={formatSizedImage(coverUrl, 40)} alt="" />
      <button
        className="play sprite_icon"
        title="播放"
        onClick={() => onPlayClick?.()}
      />
    </ProgramCoverWrapper>
  )
}
