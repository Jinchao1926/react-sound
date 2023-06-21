import styled from "styled-components";

export const QRcodeWrapper = styled.div`
  padding: 16px 18px 9px;
  position: fixed;
  top: 400px;
  right: 25px;
  z-index: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: white;
  text-align: center;

  img {
    height: 100px;
    width: 100px;
  }
  p {
    margin-top: 10px;
  }
`