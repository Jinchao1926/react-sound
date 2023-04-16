import styled from "styled-components";

export const DiscoverWrapper = styled.div`
  .top {
    height: 30px;
    box-sizing: border-box;
    background-color: #C20C0C;
    border-bottom: 1px solid #a40011;

    .nav-list {
      display: flex;
      position: relative;
      height: 100%;
    }
    .nav-item {
      a {
        display: inline-block;
        line-height: 20px;
        padding: 0 13px;
        margin: 2px 17px 0;
        border-radius: 20px;
        color: #FFF;
        font-size: 12px;

        &:hover, &.active {
          background: #9B0909;
        }
      }
      :first-of-type {
        margin-left: 180px;
      }
    }
  }
`