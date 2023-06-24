import styled from "styled-components";

export const MultiDownloadWrapper = styled.div`
  margin-bottom: 24px;

  .list {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px;
    height: 65px;
    background-position: 0 -392px;

    a {
      text-indent: -9999px;
      height: 48px;
    }
    .iOS {
      width: 42px;
      &:hover {
        background-position: 0 -472px;
      }
    }
    .pc {
      width: 60px;
      &:hover {
        background-position: -70.5px -472px;
      }
    }
    .android {
      width: 42px;
      &:hover {
        background-position: -159px -472px;
      }
    }
  }

  .tip {
    color: #999;
  }
`