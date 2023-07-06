import styled from "styled-components";

export const SectionHeaderNormalWrapper = styled.div`
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;

  .title {
    font-size: 24px;
    line-height: 34px;
  }

  .keyword-list {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .item {
      .keyword {
        color: #666;
        cursor: pointer;
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
`