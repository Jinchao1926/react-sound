import styled from 'styled-components'

export const HotAnchorWrapper = styled.div`
  margin-top: 30px;

  .header {
    margin: 0 20px;
  }

  .anchor-list {
    margin: 20px 0 0 20px;

    .anchor {
      width: 210px;
      height: 40px;
      margin-bottom: 10px;
      display: flex;

      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .info {
        width: 160px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .name {
          color: #000;
        }
        .desc {
          color: #666;
        }
      }
    }
  }
`
