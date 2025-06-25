import styled from 'styled-components'

export const ResidentSingerWrapper = styled.div`
  margin-top: 15px;

  .header {
    margin: 0 20px;
  }

  .singer-list {
    margin: 6px 0 14px 20px;

    .singer {
      margin-top: 14px;
      width: 210px;
      height: 62px;
      background: #fafafa;
      display: flex;

      :hover {
        background-color: #f4f4f4;
      }

      .avatar {
        width: 62px;
        height: 62px;
      }
      .info {
        width: 133px;
        height: 60px;
        padding-left: 14px;
        border: 1px solid #e9e9e9;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .name {
          font-size: 14px;
        }
        .desc {
          color: #666;
        }
      }
    }
  }

  .footer {
    height: 31px;
    align-items: center;
    a {
      height: 30px;
      line-height: 30px;
      margin: 0 20px;
      border-radius: 4px;
      border: 1px solid #c3c3c3;
      color: #333;
      text-align: center;
      font-weight: 700;
      background-color: #fafafa;
      &:hover {
        background-color: #fff;
      }
    }
  }
`
