import styled from 'styled-components'

export const FriendLoginWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;

  .background {
    width: 902px;
    height: 414px;
    margin: 0 auto 0;
    padding-top: 70px;
    background: url(${require('@/assets/img/login_02.png')});
    background-position: 0 70px;
    background-clip: content-box;

    .tips {
      padding: 178px 0 0 535px;
      line-height: 23px;
      font-size: 14px;
      color: #666;
    }

    .login {
      width: 157px;
      height: 48px;
      margin: 36px 0 0 535px;
      text-indent: -9999px;
      background: url(${require('@/assets/img/login_02.png')}) no-repeat 0
        9999px;
      background-position: -535px -260px;
      &:hover {
        background-position: 0 -430px;
      }
    }
  }
`
