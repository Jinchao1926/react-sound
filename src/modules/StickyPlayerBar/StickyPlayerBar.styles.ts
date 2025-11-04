import styled from 'styled-components'

import { Sprite } from '@/components/UI'

import { Player as PlayerComponent } from './Player'

export const StickyPlayerBarWrapper = styled.div`
  --player-height: 53px;
  --hide-distance: 46px;
  --transition-easing: ease-in-out;

  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--player-height);
  transition-property: bottom;
  transition-timing-function: var(--transition-easing);

  /* 锁定状态保持显示 */
  &[data-locked='true'] {
    bottom: 0 !important;
  }
`

export const Player = styled(PlayerComponent)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

export const LockBarButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'lockBar',
  component: 'button',
})`
  position: absolute;
  top: -14px;
  right: 15px;
  width: 52px;
  height: 20px;

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`

interface ILockIcon {
  isLocked: Boolean
}
export const LockIcon = styled(Sprite)
  .withConfig({
    shouldForwardProp: (prop) => prop !== ('isLocked' as string),
  })
  .attrs<ILockIcon>(({ isLocked }) => ({
    sprite: 'playbar',
    icon: isLocked ? 'locked' : 'unlocked',
    component: 'span',
  }))`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-top: 3px;
`
