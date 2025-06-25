import styled from 'styled-components'

export const MineLoginWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;

  .background {
    width: 807px;
    height: 268px;
    margin: 0 auto;
    padding-top: 104px;
    background: url(${require('@/assets/img/login_01.png')});
    background-position: 0 104px;
    // 图片只在 content-box 区域显示，不会延伸到 padding 区域
    background-clip: content-box;

    .login {
      width: 167px;
      height: 45px;
      margin: 202px 0 0 482px;
      text-indent: -9999px;
      background: url(${require('@/assets/img/login_01.png')}) no-repeat 0
        9999px;
      background-position: -482px -202px;
      &:hover {
        background-position: 0 -278px;
      }
    }
  }
`
