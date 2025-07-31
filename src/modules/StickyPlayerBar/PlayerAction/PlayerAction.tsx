import type { FC } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'
import { PLAY_MODE } from '@/types/player'

import { PlayerActionWrapper } from './PlayerAction.styles'

export const PlayerAction: FC = () => {
  const {
    state: { playlist, playMode },
    switchPlayMode,
  } = usePlayerContext()

  return (
    <PlayerActionWrapper>
      <div className="left">
        <button className="btn pip" />
        <button className="sprite_player_bar btn collect" />
        <button className="sprite_player_bar btn share" />
      </div>
      <div className="right sprite_playbar">
        <button className="sprite_player_bar btn mute" />
        <button
          className={`sprite_player_bar btn ${playMode}`}
          onClick={switchPlayMode}
          title={
            playMode === PLAY_MODE.SINGLE_LOOP
              ? '单曲循环'
              : playMode === PLAY_MODE.RANDOM
                ? '随机播放'
                : '循环'
          }
        />
        <button className="sprite_player_bar btn playlist">
          {playlist.length}
        </button>
      </div>
    </PlayerActionWrapper>
  )
}
