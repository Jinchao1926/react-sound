import styled from "styled-components";

export const UserProfileWrapper = styled.div`
  height: 126px;
  text-align: center;
  background-position: 0 -0;

  p {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666;
  }

  button {
    display: inline-block;
    width: 100px;
    height: 31px;
    background-position: 0 -195px;
    color: #fff;
    text-shadow: 0 1px 0 #8a060b;

    &:hover {
      background-position: -110px -195px;
    }
  }
`