import styled from "styled-components";

export const RankingCategoryWrapper = styled.div`
  margin-top: 40px;

  .header1, .header2 {
    padding: 0 10px 12px 15px;
    font-size: 14px;
    line-height: 20px;
  }
  .header2 {
    margin-top: 20px;
  }

  .category {
    padding: 10px 0 10px 20px;

    &:hover {
      background-color: #f4f4f4;
    }
    &.selected {
      background-color: #e6e6e6;
    }
    
    .content {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 10px;

        p {
          line-height: 16px;
        }
        .name {
          margin-top: 2px;
          margin-bottom: 8px;
        }
        .frequency {
          color: #999;
        }
      }
    }
  }
`