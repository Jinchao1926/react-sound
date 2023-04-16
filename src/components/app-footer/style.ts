import styled from "styled-components";

export const AppFooterWrapper = styled.div`
  height: 325px;
  border-top: 1px solid #d3d3d3;
  background-color: #f2f2f2;
  font-size: 12px;
`

export const FooterTop = styled.div`
  margin: 33px 70px 0 70px;
  display: flex;
  justify-content: space-between;

  .title {
    display: inline-block;
    width: 100px;
    margin-top: 10px;
    text-align: center;
    color: rgb(0, 0, 0, 0.5);
  }
`

export const FooterBottom = styled.div`
  margin-top: 60px;
  color: #666;

  .copyright {
    display: flex;
    justify-content: center;
    line-height: 24px;

    a {
      color: #666;
    }
    a:hover {
      text-decoration: underline;
    }

    .line {
      margin: 0 10px;
      color: #D9D9D9;
    }
    .line:last-child {
      display: none;
    }

    .text {
      margin-right: 14px;
    }
    .text:last-child {
      margin-right: 0;
    }
  }
`