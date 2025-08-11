import styled from 'styled-components'

export const PlaylistCoverWrapper = styled.div`
  margin: 20px 0 10px;
  width: 140px;

  .cover {
    height: 140px;
    width: 140px;
    position: relative;

    a {
      height: 100%;
      width: 100%;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 27px;
      background-position: 0 -537px;
      color: #ccc;
      display: flex;

      .headset {
        background-position: 0 -24px;
        width: 14px;
        height: 11px;
        margin: 9px 5px 9px 10px;
      }
      .play-count {
        margin: 7px 0 0 0;
      }
      .play {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background-position: 0 0;
      }
    }
  }

  .cover-info {
    margin: 8px 0 3px;
    font-size: 14px;
    color: #000;
    max-width: 140px;
    line-height: 1.4;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .cover-source {
    display: flex;
    gap: 4px;
    max-width: 140px;
    color: #999;

    .name {
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
    img {
      height: 13px;
      width: 13px;
    }
  }
`
