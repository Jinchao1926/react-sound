import type { FC } from 'react'

import {
  CollectButton,
  VolumeButton,
  PipButton,
  ShareButton,
  PlayModeButton,
  PlaylistCountButton,
} from '@/components/Shared/Playbar'
import { Flex } from '@/components/UI'
import { usePlayerContext } from '@/providers/PlayerProvider'

import { PlayControl } from './PlayerAction.styles'

export const PlayerAction: FC = () => {
  const {
    state: { playlist, playMode },
    switchPlayMode,
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
        <PlaylistCountButton>{playlist.length}</PlaylistCountButton>
      </PlayControl>
    </Flex>
  )
}
