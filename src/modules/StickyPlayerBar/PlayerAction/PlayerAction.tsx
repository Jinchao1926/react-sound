import type { FC } from 'react'

import { Flex } from '@/components/Core'
import {
  CollectButton,
  VolumeButton,
  PipButton,
  ShareButton,
  PlayModeButton,
  PlaylistCountButton,
} from '@/components/Shared/Playbar'
import { usePlayerContext } from '@/providers/PlayerProvider'

import { PlayControl } from './PlayerAction.styles'

export const PlayerAction: FC = () => {
  const {
    state: { playlist, playMode },
    switchPlayMode,
    togglePlaylistPannel,
  } = usePlayerContext()

  return (
    <Flex>
      <Flex align="center" width={87} gap={2}>
        <PipButton />
        <CollectButton />
        <ShareButton />
      </Flex>
      <PlayControl>
        <VolumeButton />
        <PlayModeButton playMode={playMode} onClick={switchPlayMode} />
        <PlaylistCountButton onClick={togglePlaylistPannel}>
          {playlist.length}
        </PlaylistCountButton>
      </PlayControl>
    </Flex>
  )
}
