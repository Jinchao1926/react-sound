import styled from 'styled-components'

export const RankingTrendWrapper = styled.div`
  text-align: center;
  font-size: 10px;

  &.keep {
    color: #999;
  }
  &.up {
    color: #ba2226;
  }
  &.down {
    color: #4abbeb;
  }

  span {
    display: inline-block;
    margin: -1px 2px 0 0;
  }
  .new {
    width: 16px;
    height: 17px;
    background-position: -67px -283px;
  }
  .keep,
  .up,
  .down {
    width: 6px;
    height: 6px;
  }
  .keep {
    background-position: -74px -274px;
  }
  .up {
    background-position: -74px -304px;
  }
  .down {
    background-position: -74px -324px;
  }
`
