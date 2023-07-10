import styled from "styled-components";

export const SectionHeaderNormalWrapper = styled.div`
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: baseline;

    .title {
      font-size: 24px;
      line-height: 34px;
    }
    .sub-title {
      margin-left: 10px;
      color: #999;
    }

    .keyword-list {
      display: flex;
      align-items: center;
      margin-left: 20px;

      .item {
        .keyword {
          color: #666;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }

        .divider {
          margin: 0 13px;
          color: #ccc;
        }

        &:last-child .divider {
          display: none;
        }
      }
    }
  }
  
  .right {
    margin-top: 16px;
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
`