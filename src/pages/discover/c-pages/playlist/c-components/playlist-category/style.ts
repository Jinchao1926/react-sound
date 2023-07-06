import styled from "styled-components";

export const PlaylistCategoryWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 35px;
  left: -40px;
  width: 720px;

  .header {
    height: 32px;
    background-position: 0 0;
    .arrow {
      position: absolute;
      top: 2px;
      left: 132px;
      width: 24px;
      height: 11px;
      background-position: -48px 0;
    }
  }
  .body {
    background-position: -720px 0;
    background-repeat: repeat-y;
    padding: 0 10px;

    .all {
      height: 37px;
      padding-left: 26px;
      border-bottom: 1px solid #e6e6e6;

      &>button {
        background-position: 0 -64px;
        width: 75px;
        height: 26px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    dl {
      &:last-of-type {
        dd {
          padding-bottom: 25px;
        }
      }
      dt {
        float: left;
        display: inline-flex;
        align-items: center;
        width: 70px;
        margin: 0 -100px 0 26px;
        padding-top: 15px;
        /* border-right: 1px solid #e6e6e6; */
        font-weight: bold;

        .icon {
          display: inline-block;
          width: 23px;
          height: 23px;
          margin: 0 8px 4px 0;
        }
        .icon0 {
          background-position: -20px -735px;
        }
        .icon1 {
          background-position: 0 -60px;
        }
        .icon2 {
          background-position: 0 -88px;
        }
        .icon3 {
          background-position: 0 -117px;
        }
        .icon4 {
          background-position: 0 -141px;
        }
      }

      dd {
        margin-left: 96px;
        padding: 16px 15px 0 15px;
        border-left: 1px solid #e6e6e6;
        line-height: 24px;

        .name {
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          &.selected {
            background: #a7a7a7;
            color: #fff;
            padding: 2px 6px;
          }
        }
        .divider {
          margin: 0 8px 0 10px;
          color: #d8d8d8;
        }
      }
    }
  }
  .footer {
    height: 20px;
    background-position: -1440px -12px;
  }
`