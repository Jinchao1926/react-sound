import styled from 'styled-components'

export const RadioCategoryHeaderWrapper = styled.div`
  /* margin: 0 -40px; */
  /* display: flex; */
  position: relative;

  .category-page {
    display: flex !important;
    flex-wrap: wrap;
  }

  .dots {
    bottom: 0px;
    li {
      margin: 0 1px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #aaa;
      }
    }

    li.slick-active {
      button {
        background-color: #c20c0c;
      }
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    width: 20px;
    height: 30px;
    opacity: 0.25;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    &[disabled] {
      opacity: 0.08;
    }
  }
  .left {
    left: -26px;
    background-position: 0 -30px;
  }
  .right {
    right: -26px;
    background-position: -30px -30px;
  }
`
