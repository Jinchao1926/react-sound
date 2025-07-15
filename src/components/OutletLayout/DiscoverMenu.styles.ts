import styled from 'styled-components'

export const DiscoverMenuWrapper = styled.div`
  height: 30px;
  box-sizing: border-box;
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;

  .nav-list {
    display: flex;
    position: relative;
    height: 100%;
  }
  .nav-item {
    a {
      display: inline-block;
      line-height: 20px;
      padding: 0 13px;
      margin: 2px 17px 0;
      border-radius: 20px;
      color: #fff;
      font-size: 12px;

      &:hover,
      &.active {
        background: #9b0909;
      }
    }
    :first-of-type {
      margin-left: 180px;
    }
  }
`
