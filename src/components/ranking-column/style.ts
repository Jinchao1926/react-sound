import styled from 'styled-components'

export const RankingColumnWrapper = styled.div`
  width: 230px;
`

export const RankingColumnHeaderWrapper = styled.div`
  height: 100px;
  padding: 20px 0 0 19px;
  display: flex;

  .cover {
    width: 80px;
    height: 80px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
    a {
      background-position: -145px -57px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }

  .info {
    width: 116px;
    margin: 6px 0 0 10px;

    a > h3 {
      font-size: 14px;
      color: #333;
      height: 20px;
      display: flex;
      align-items: center;
    }
    a:hover {
      text-decoration: underline;
    }

    .actions {
      margin-top: 10px;

      .btn {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        text-indent: -9999px;
        cursor: pointer;
      }
      .play {
        background-position: -267px -205px;
        &:hover {
          background-position: -267px -235px;
        }
      }
      .collect {
        background-position: -300px -205px;
        &:hover {
          background-position: -300px -235px;
        }
      }
    }
  }
`

export const RankingColumnListWrapper = styled.div`
  .item {
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;

    // 前三个高亮
    :nth-child(-n + 3) .index {
      color: #c10d0c;
    }

    .index {
      width: 35px;
      margin-left: 15px;
      font-size: 16px;
      color: #666;
      // 水平居中
      text-align: center;
    }
    .name {
      width: 170px;
      flex: 1;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }

    .actions {
      display: none;
      width: 82px;

      .btn {
        width: 17px;
        height: 17px;
        margin-left: 8px;
        cursor: pointer;
      }
      .play {
        background-position: -267px -268px;
        &:hover {
          background-position: -267px -288px;
        }
      }
      .addTo {
        margin-top: 2px;
        background-position: 0 -700px;
        &:hover {
          background-position: -22px -700px;
        }
      }
      .collect {
        background-position: -297px -268px;
        &:hover {
          background-position: -297px -288px;
        }
      }
    }

    &:hover .actions {
      display: flex;
    }
  }
`

export const RankingColumnFootererWrapper = styled.div`
  height: 32px;
  margin-right: 32px;
  text-align: right;
  line-height: 32px;

  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
`
