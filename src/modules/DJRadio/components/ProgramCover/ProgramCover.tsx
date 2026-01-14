import type { FC } from 'react'

import { Image } from '@/components/Core'
import { formatSizedImage } from '@/utils/format/dataFormat'

import { PlayButton, ProgramCoverWrapper } from './ProgramCover.styles'

interface ProgramCoverProps {
  coverUrl: string
  onPlayClick?: () => void
}

export const ProgramCover: FC<ProgramCoverProps> = ({
  coverUrl,
  onPlayClick,
}) => {
  return (
    <ProgramCoverWrapper>
      <Image
        src={formatSizedImage(coverUrl, 40)}
        alt=""
        width="100%"
        height="100%"
      />
      <PlayButton onClick={() => onPlayClick?.()} />
    </ProgramCoverWrapper>
  )
}
