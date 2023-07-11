import styled from "styled-components";

export const RadioCoverWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  .play {
    background-position: 0 -85px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 22px;
    height: 22px;
    cursor: pointer;
    display: none;
  }
  &:hover .play {
    display: block;
  }
`