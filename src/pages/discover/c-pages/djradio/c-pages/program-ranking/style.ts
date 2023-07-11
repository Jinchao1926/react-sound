import styled from "styled-components";

export const ProgramRankingWrapper = styled.div`
  position: relative;

  .tips {
    position: absolute;
    top: 13px;
    right: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-position: 0 -50px;
    &:hover {
      background-position: -20px -50px;
    }
  }

  .ranking-list {
    border: 1px solid #e2e2e2;
    border-width: 0 1px 1px;
  }

  .ranking-item {
    height: 40px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    // 奇偶
    :nth-child(odd) {
      background-color: white;  
    }
    :nth-child(even) {
      background-color: #f7f7f7;
    }
    &:hover {
      background-color: #eee;
    }

    .rank {
      width: 47px;
      margin-top: 6px;
      .index {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 16px;
        color: #999;
      }
      .red {
        color: #da4545;
      }
    }

    // Simple Version
    .content {
      width: 208px;
      margin: 1px 0 0 10px;
      // 重写 css
      .name, .brand {
        margin: 0;
        width: 100%;
        line-height: 20px;
      }
    }

    // Full Version
    .item {
      margin: 0 0 0 10px;
    }
    .name {
      width: 304px;
      &:hover {
        text-decoration: underline;
      }
    }
    .brand {
      color: #666;
      width: 176px;
      &:hover {
        text-decoration: underline;
      }
    }
    .category {
      width: 140px;
      margin: 1px 0 0 10px;

      a {
        display: inline-block;
        color: #999;
        height: 16px;
        padding: 0 6px;
        border: 1px solid #999;
        line-height: 16px;
        &:hover {
          color: #666;
          border: 1px solid #666;
        }
      }
    }
  }
`

export const RankingHotWrapper = styled.div<{marginLeft: number}>`
  display: block;
  position: relative;
  margin-left: ${props => props.marginLeft}px;
  width: 100px;
  height: 8px;
  background-position: 0 -240px;

  i {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-position: 0 -304px;
  }
`