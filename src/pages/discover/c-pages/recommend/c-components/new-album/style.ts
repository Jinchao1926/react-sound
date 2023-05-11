import styled from "styled-components";

export const NewAlbumWrapper = styled.div`

  .inner {
    height: 186px;
    margin: 20px 0 37px;
    background: #f5f5f5;
    border: 1px solid #d3d3d3;
    display: flex;
    justify-content: center;

    .album-list {
      width: 645px;
      height: 180px;
      margin-top: 28px;
      padding-left: 10px;
      box-sizing: border-box;

      .album-page {
        display: flex !important;
        justify-content: space-between;
      }
    }

    .arrow {
      margin-top: 71px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .arrow-left {
      background-position: -260px -75px;
    }
    .arrow-right {
      background-position: -300px -75px;
    }
  }
`