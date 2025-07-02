import styled from 'styled-components'

export const RankingListWrapper = styled.div`
  padding: 0 30px 40px 40px;

  .section-header {
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      line-height: 28px;
    }
    .track-count {
      margin: 9px 0 0 20px;
      color: #666;
    }
    .play-count {
      color: #c20c0c;
    }
  }
`

export const RankingTable = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    border: 1px solid #d9d9d9;

    thead {
      background-position: 0 0;
      background-repeat: repeat-x;
      th {
        height: 36px;
        color: #666;
        font-weight: normal;
        text-align: left;
        padding-left: 10px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-width: 0 1px 0 1px;
      }

      .ranking {
        width: 77px;
      }
      .title {
      }
      .duration {
        width: 91px;
      }
      .singer {
        width: 173px;
      }
    }

    tbody {
      tr {
        height: 30px;

        // 前三行
        &:nth-of-type(-n + 3) {
          height: 70px;
        }

        // 奇偶
        &:nth-child(odd) {
          background-color: #f7f7f7;
        }
        &:nth-child(even) {
          background-color: white;
        }

        td {
          padding: 6px 10px;
        }

        // 排名
        .ranking-num {
          display: flex;
          justify-content: center;
          height: 18px;
          line-height: 18px;
          text-align: center;
          .num {
            width: 25px;
            color: #999;
          }
          .trend {
            width: 32px;
            .new {
              display: inline-block;
              background-position: -67px -283px;
              width: 16px;
              height: 17px;
            }
          }
        }

        // 歌曲名称
        .song-name {
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          .play {
            flex-shrink: 0;
            background-position: 0 -103px;
            width: 17px;
            height: 17px;
            cursor: pointer;
            &:hover {
              background-position: 0 -128px;
            }
          }
          .name {
            flex-shrink: 0;
            margin-left: 8px;
            &:hover {
              text-decoration: underline;
            }
          }
          .alias {
            color: #aeaeae;
          }
          .mv {
            display: inline-block;
            width: 23px;
            height: 17px;
            margin: 3px 0 0 2px;
            background-position: 0 -151px;
          }
        }

        // 时长
        .duration-item {
          color: #666;
          padding: 0;

          .duration {
            padding: 0 10px;
          }
          .actions {
            display: none;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;

            .btn {
              width: 17px;
              height: 17px;
              cursor: pointer;
            }
            .addTo {
              margin-top: 4px;
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
            .share {
              background-position: 0 -193px;
              &:hover {
                background-position: -20px -193px;
              }
            }
            .download {
              background-position: -80px -172px;
              &:hover {
                background-position: -103px -172px;
              }
            }
          }

          &:hover .actions {
            display: flex;
          }
          &:hover .duration {
            display: none;
          }
        }

        // 歌手名称
      }
    }
  }
`
