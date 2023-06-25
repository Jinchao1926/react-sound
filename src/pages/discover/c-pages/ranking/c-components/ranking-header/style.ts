import styled from "styled-components";

export const RankingInfoWrapper = styled.div`
  padding: 40px;
  display: flex;

  .cover {
    position: relative;
    padding: 3px;
    border: 1px solid #ccc;
    width: 150px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
    span {
      background-position: -230px -380px;
      position: absolute;
      width: 150px;
      height: 150px;
      top: 3px;
      left: 3px;
    }
  }

  .info {
    margin-left: 30px;
    
    .title {
      margin: 16px 0 4px;
      font-size: 20px;
    }
    .update {
      margin-bottom: 20px;
      height: 35px;
      display: flex;
      align-items: center;
      
      .icon {
        display: inline-block;
        background-position: -18px -682px;
        width: 13px;
        height: 13px;
      }
      .time {
        margin-left: 5px;
        color: #666;
      }
      .frequency {
        color: #999;
      }
    }
  }
`