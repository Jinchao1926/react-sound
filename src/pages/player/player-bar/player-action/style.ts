import styled from "styled-components";

export const PlayerActionWrapper = styled.div`
  display: flex;

  .left {
    display: flex;
    width: 87px;
  }
  .right {
    display: flex;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;
    box-sizing: border-box;
  }

  .btn {
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    cursor: pointer;
  }
  .pip {
    background: url(${require('@/assets/img/pip.png')});
    &:hover {
      background-position: 0px -25px;
    }
  }
  .collect {
    background-position: -88px -163px;
    &:hover {
      background-position: -88px -189px;
    }
  }
  .share {
    background-position: -114px -163px;
    &:hover {
      background-position: -114px -189px;
    }
  }

  .mute {
    background-position: -2px -248px;
    &:hover {
      background-position: -31px -248px;
    }
  }
  .loop {
    background-position: -3px -344px;
    &:hover {
      background-position: -33px -344px;
    }
  }
  .random {
    background-position: -66px -248px;
    &:hover {
      background-position: -93px -248px;
    }
  }
  .single-loop {
    background-position: -66px -344px;
    &:hover {
      background-position: -92px -344px;
    }
  }
  .playlist {
    width: 59px;
    padding-left: 21px;
    line-height: 27px;
    text-align: center;
    color: #666;
    background-position: -42px -68px;
    &:hover {
      background-position: -42px -98px;
    }
  }
`