import styled from 'styled-components'

export const SectionHeaderRCMWrapper = styled.div`
  background-position: -225px -156px;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    margin-bottom: 4px;

    .title {
      font-size: 20px;
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
      margin-right: 20px;
    }

    .keyword-list {
      display: flex;
      align-items: center;

      .item {
        .keyword {
          display: inline;
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
    align-items: center;
    margin-bottom: 4px;

    a {
      color: #666;
      display: inline-block;
    }

    .icon {
      display: inline-block;
      background-position: 0 -240px;
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      vertical-align: middle;
    }
  }
`
