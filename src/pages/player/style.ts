import styled from "styled-components";

export const LockablePlayerWrapper = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  height: 53px;
  transition: bottom 0.5s ease-in-out;

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

    .lock-icon, .unlock-icon {
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