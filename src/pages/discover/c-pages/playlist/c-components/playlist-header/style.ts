import styled from 'styled-components'

export const PlaylistHeaderWrapper = styled.div`
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  justify-content: space-between;
`

export const HeaderLeft = styled.div`
  display: flex;
  position: relative;

  .title {
    font-size: 24px;
    line-height: 34px;
  }
  .select {
    margin: 2px 0 0 12px;
    padding: 0 5px 0 0;
    height: 31px;
    line-height: 31px;
    background-position: right -100px;
    cursor: pointer;
    &:hover {
      background-position: right -182px;
    }

    span {
      display: inline-block;
      width: 86px;
      height: 100%;
      line-height: 30px;
      padding-left: 5px;
      box-sizing: border-box;
      color: #0c73c2;
      background-position: 0 -59px;
      &:hover {
        background-position: 0 -141px;
      }
    }
    i {
      display: inline-block;
      margin: 0 0 1px 5px;
      width: 8px;
      height: 5px;
      background-position: -70px -543px;
    }
  }
`

export const HeaderRight = styled.div`
  .hot {
    width: 46px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    border-radius: 3px;
    color: white;
    background-position: 0 0;
    &:hover {
      text-decoration: underline;
    }
  }
`
