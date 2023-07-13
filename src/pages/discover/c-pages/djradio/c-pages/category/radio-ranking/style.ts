import styled from "styled-components";

export const RadioRankingWrapper = styled.div`
  margin-top: 35px;
  
  .radio-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const RadioItemWrapper = styled.div`
  width: 435px;
  height: 120px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
  display: flex;

  .left {
    width: 120px;
    height: 120px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .right {
    margin-left: 20px;

    .name {
      margin-top: 2px;
      height: 64px;
      line-height: 64px;
      font-size: 18px;
    }
    .dj {
      margin: -2px 0 8px 0;
      height: 21px;
      line-height: 20px;
      display: flex;
      align-items: center;

      .dj-icon {
        display: inline-block;
        width: 14px;
        height: 15px;
        background-position: -50px -300px;
      }
      .user-name {
        display: inline-block;
        margin: 0 3px 0 8px;
        &:hover {
          text-decoration: underline;
        }
      }
      .vip {
        height: 13px;
        width: 13px;
        display: inline-block;
      }
    }
    .desc {
      color: #999;
      white-space: pre;
    }
  }
`