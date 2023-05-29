import styled from "styled-components";

export const PlayerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 53px;
  background-position: 0 0;
  background-repeat: repeat-x;

  .content {
    margin-top: 6px;
    height: 47px;
    display: flex;
  }
`

export const PlayerControl = styled.div`
  display: flex;
  padding-top: 6px;
  width: 137px;

  .prev, .next {
    margin-top: 5px;
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }
  .next {
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
`

interface IPlayButton {
  isPlaying: Boolean
}
export const PlayButton = styled.button<IPlayButton>`
  width: 36px;
  height: 36px;
  margin: 0 8px;
  background-position: ${props => props.isPlaying ? '0 -165px' : '0 -204px'};
  &:hover {
    background-position: ${props => props.isPlaying ? '-40px -165px' : '-40px -204px'};
  }
`

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;

  .avatar {
    width: 34px;
    height: 34px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
    .sprite_player_bar {
      background-position: 0 -80px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .info {
    width: 581px;
    height: 100%;
    margin-left: 15px;

    .music {
      display: flex;
      height: 28px;
      line-height: 28px;

      .name {
        color: #e8e8e8;
        max-width: 300px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          text-decoration: underline;
        }
      }
      .singer {
        display: flex;
        margin-left: 15px;
        color: #9b9b9b;
        a {
          color: #9b9b9b;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`

export const PlayerProgressBar = styled.div`
  position: relative;

  .time {
    position: absolute;
    top: -3px;
    left: 480px;
    color: #797979;
    text-shadow: 0 1px 0 #121212;

    .now-time {
      color: #a1a1a1
    }
  }
`