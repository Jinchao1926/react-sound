import styled from "styled-components";

export const SongDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SongRecord = styled.div`
  .cover {
    width: 198px;
    height: 198px;
    position: relative;

    img {
      width: 130px;
      height: 130px;
      margin: 34px;
    }
    .record {
      position: absolute;
      width: 206px;
      height: 205px;
      top: -4px;
      left: -4px;
      background-position: -140px -580px;
    }
  }

  .link {
    margin: 20px 0 0 46px;
    display: flex;
    align-items: center;

    .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      background-position: -34px -863px;
    }
    a {
      color: #0c73c2;
      text-decoration: underline;
    }
  }
`

export const LyricList = styled.div`
  width: 414px;

  .header {
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-bottom: 8px;

    .icon {
      display: inline-block;
      width: 54px;
      height: 24px;
      background-position: 0 -463px;
      margin-right: 10px;
    }
  }

  .singer, .album {
    margin: 10px 0; 
    color: #999;
    display: flex;
    // 保留元素内部的空白和换行符
    white-space: pre-wrap;
    line-height: 16px;
    a {
      color: #0c73c2;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .lyric-content {
    line-height: 23px;
    white-space: pre-line;
  }

  .lyric-control {
    margin-top: 5px;
    color: #0c73c2;;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }

    .icon {
      width: 11px;
      height: 8px;
      display: inline-block;
    }
    .collapse {
      background-position: -45px -520px;
    }
    .expand {
      background-position: -65px -520px;
    }
  }
`

export const SongAction = styled.div`
  display: flex;
  margin-bottom: 38px;

  button {
    height: 31px;
    min-width: 23px;
    cursor: pointer;
  }
  .collect, .share, .download, .review {
    background-position: right -1020px;
    width: 59px;
    margin-right: 6px;
    position: relative;

    span {
      position: absolute;
      top: 0;
      left: 0;
      line-height: 30px;
      padding: 0 2px 0 28px;
    }
  }

  .play {
    width: 61px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 28px;
    color: white;
    background-position: -5px -633px;
    &:hover {
      background-position: -5px -719px;
    }
  }
  .add {
    width: 31px;
    margin-right: 5px;
    background-position: 0 -1588px;
    &:hover {
      background-position: -40px -1588px;
    }
  }
  .collect > span {
    background-position: 0 -977px;
    &:hover {
      background-position: 0 -1063px;
    }
  }
  .share > span {
    background-position: 0 -1225px;
    &:hover {
      background-position: 0 -1268px;
    }
  }
  .download > span  {
    background-position: 0 -2761px;
    &:hover {
      background-position: 0 -2805px;
    }
  }
  .review > span  {
    background-position: 0 -1465px;
    &:hover {
      background-position: 0 -1508px;
    }
  }
`