import styled from "styled-components";

export const PlayerBarWrapper = styled.div`
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

interface IPlayerControl {
  isPlaying: Boolean
}

export const PlayerControl = styled.div<IPlayerControl>`
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
  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: ${props => props.isPlaying ? '0 -165px' : '0 -204px'};
    &:hover {
      background-position: ${props => props.isPlaying ? '-40px -165px' : '-40px -204px'};
    }
  }
  .next {
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
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
    a {
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
      }
      .singer {
        margin-left: 15px;
        color: #9b9b9b;
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

export const PlayerAction = styled.div`
  display: flex;

  .left {
    display: flex;
    width: 87px;
  }
  .right {
    display: flex;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;
    box-sizing: border-box;
  }

  .btn {
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    cursor: pointer;
  }
  .pip {
    background: url(${require('@/assets/img/pip.png')});
    &:hover {
      background-position: 0px -25px;
    }
  }
  .collect {
    background-position: -88px -163px;
    &:hover {
      background-position: -88px -189px;
    }
  }
  .share {
    background-position: -114px -163px;
    &:hover {
      background-position: -114px -189px;
    }
  }

  .mute {
    background-position: -2px -248px;
    &:hover {
      background-position: -31px -248px;
    }
  }
  .loop {
    background-position: -3px -344px;
    &:hover {
      background-position: -33px -344px;
    }
  }
  .playlist {
    width: 59px;
    padding-left: 21px;
    line-height: 27px;
    text-align: center;
    color: #666;
    background-position: -42px -68px;
    &:hover {
      background-position: -42px -98px;
    }
  }
`