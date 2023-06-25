import styled from "styled-components";

export const SongOperationBarWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    height: 31px;
    padding: 0 5px 0 0;
    cursor: pointer;
  }
  .collect, .share, .download, .comment {
    background-position: right -1020px;
    margin-right: 6px;

    span {
      display: inline-block;
      height: 31px;
      line-height: 30px;
      min-width: 23px;
      padding: 0 2px 0 28px;
      font-family: simsun, 宋体;
    }
  }

  .play {
    width: 65px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 28px;
    color: white;
    background-position: -5px -633px;
    &:hover {
      background-position: -5px -719px;
    }
  }
  .add {
    width: 31px;
    margin-right: 5px;
    background-position: 0 -1588px;
    &:hover {
      background-position: -40px -1588px;
    }
  }
  .collect > span {
    background-position: 0 -977px;
    &:hover {
      background-position: 0 -1063px;
    }
  }
  .share > span {
    background-position: 0 -1225px;
    &:hover {
      background-position: 0 -1268px;
    }
  }
  .download > span  {
    background-position: 0 -2761px;
    &:hover {
      background-position: 0 -2805px;
    }
  }
  .comment > span  {
    background-position: 0 -1465px;
    &:hover {
      background-position: 0 -1508px;
    }
  }
`