import styled from "styled-components";

export const SimilarSongWrapper = styled.div`
  margin-bottom: 25px;

  .songs {
    margin-top: 20px;
  }
`

export const SimilarSongItem = styled.div`
  margin-top: 10px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a:hover {
    text-decoration: underline;
  }

  .info {
    width: 156px;
    line-height: 16px;

    .song, .singers{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .singers {
      display: flex;
      color: #999;
      .singer-name {
        color: #999;
      }
    }
  }
  
  .control {
    width: 36px;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 10px;
    height: 11px;
    cursor: pointer;
  }
  .play {
    background-position: -69px -455px;
  }
  .addto {
    background-position: -87px -454px;
  }
`