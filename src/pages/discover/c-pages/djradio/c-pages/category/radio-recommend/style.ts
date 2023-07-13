import styled from "styled-components";

export const RadioRecommendWrapper = styled.div`
  margin-top: 20px;

  .radio-list {
    margin: 16px 0 0 -37px;
    display: flex;
  }
`

export const RadioItemWrapper = styled.div`
  margin-left: 37px;
  .cover {
    width: 150px;
    height: 150px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .name {
    margin: 13px 0 6px;
    line-height: 16px;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }

  .desc {
    color: #999;
    line-height: 18px;
  }
`