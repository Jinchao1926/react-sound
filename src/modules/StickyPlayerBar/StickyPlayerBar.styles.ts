import styled from 'styled-components'

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

  .player {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .lock {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 20px;
    background-position: 0 -380px;
    cursor: pointer;
    border: none;
    padding: 0;
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
    }

    .lock-icon,
    .unlock-icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
    }
    .lock-icon {
      background-position: -100px -380px;
      &:hover {
        background-position: -100px -400px;
      }
    }
    .unlock-icon {
      background-position: -80px -380px;
      &:hover {
        background-position: -80px -400px;
      }
    }
  }
`
