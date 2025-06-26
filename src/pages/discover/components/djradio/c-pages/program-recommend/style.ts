import styled from 'styled-components'

export const ProgramRecommendWrapper = styled.div`
  .program-list {
    border: 1px solid #e2e2e2;
    border-width: 0 1px 1px;
  }

  .program-item {
    padding: 10px 0;
    height: 40px;
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

    .radio-cover {
      margin-left: 20px;
    }

    // Simple Version
    .content {
      width: 254px;
      margin: 1px 0 0 10px;
      // 重写 css
      .name,
      .brand {
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
      width: 166px;
      &:hover {
        text-decoration: underline;
      }
    }
    .play-count {
      color: #999;
      width: 90px;
    }
    .thumbs-up {
      color: #999;
      width: 126px;
    }

    .category {
      color: #999;
      height: 16px;
      margin: 1px 0 0 10px;
      padding: 0 6px;
      border: 1px solid #999;
      line-height: 16px;
      &:hover {
        color: #666;
        border: 1px solid #666;
      }
    }
  }
`
