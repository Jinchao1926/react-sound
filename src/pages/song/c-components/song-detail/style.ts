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
    display: inline-block;
    margin-top: 38px;
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