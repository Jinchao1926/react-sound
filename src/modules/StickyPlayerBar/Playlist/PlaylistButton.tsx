import { useRef, type FC } from 'react'

import { ClearButton, CollectButton } from '@/components/Shared/Playlist'

import { PlaylistButtonWrapper, PlaylistText } from './PlaylistButton.styles'

export interface PlaylistButtonProps {
  type?: 'collect' | 'clear'
  className?: string
  onClick?: () => void
}

export const PlaylistButton: FC<PlaylistButtonProps> = ({
  type = 'collect',
  className,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = () => {
    buttonRef.current?.classList.add('active')
  }

  const handleMouseLeave = () => {
    buttonRef.current?.classList.remove('active')
  }

  return (
    <PlaylistButtonWrapper
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {type === 'collect' ? (
        <CollectButton ref={buttonRef} />
      ) : (
        <ClearButton ref={buttonRef} />
      )}
      <PlaylistText>{type === 'collect' ? '收藏全部' : '清除'}</PlaylistText>
    </PlaylistButtonWrapper>
  )
}
