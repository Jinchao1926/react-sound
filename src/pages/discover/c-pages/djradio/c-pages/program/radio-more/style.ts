import styled from 'styled-components'

export const RadioMoreWrapper = styled.div`
  margin-top: 35px;

  .radio-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const RadioMoreItemWrapper = styled.div`
  display: flex;
  width: 435px;
  height: 120px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;

  :nth-last-child(-n + 2) {
    border-bottom: none;
  }

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
      margin: 16px 0 20px;
      font-size: 18px;
      &:hover {
        text-decoration: underline;
      }
    }
    .desc {
      color: #999;
      line-height: 20px;
    }
  }
`
