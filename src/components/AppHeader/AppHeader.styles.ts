import styled from 'styled-components'

export const AppHeaderWrapper = styled.div`
  height: 70px;
  background-color: #242424;
  border-bottom: 1px #000;
  font-size: 14px;
  color: #fff;
`

export const AppNavigationItem = styled.div`
  position: relative;

  a {
    padding: 0 19px;
    color: #ccc;
  }

  // 鼠标悬停在 a 上
  &:hover a,
  .active {
    background-color: #000;
    color: #fff;
  }

  // red triangle
  .active .icon {
    position: absolute;
    display: inline-block;
    width: 12px;
    height: 7px;
    bottom: -1px;
    left: 50%; // 元素左边距位于父元素中心
    transform: translate(-50%, 0); // 元素左移自身宽度的一半
    background-position: -105px -70px;
    background-size: 120px auto;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;

  .logo-app {
    // a 元素默认不能修改宽高
    display: block;
    width: 156px;
    height: 100%;
    // 背景图片定位到元素的左上角
    background-position: 0 0;
    padding-right: 20px;
    // SEO 优化，但是又不想显示文本
    text-indent: -9999px;
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 12px;
  margin-left: 5px;

  .search {
    width: 158px;
    height: 32px;
    border-radius: 32px;

    input {
      &::placeholder {
        font-size: 12px;
        color: #9b9b9b;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    // 元素的宽高包含边距和内边距
    box-sizing: border-box;
    border: 1px solid #4f4f4f;
    line-height: 33px;
    color: #ccc;
    border-radius: 32px;
    margin-left: 12px;
  }

  .login {
    color: #787878;
    margin: 0 22px 0 20px;
  }
`
