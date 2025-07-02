import styled from 'styled-components'

export const RadioCategoryHeaderWrapper = styled.div`
  /* margin: 0 -40px; */
  /* display: flex; */
  position: relative;

  .category-page {
    display: flex !important;
    flex-wrap: wrap;

    .category-item {
      width: 70px;
      height: 72px;
      text-align: center;
      color: #888;
      font-size: 12px;
      cursor: pointer;
      margin: 2px 33px 23px 0;
      :nth-child(9n) {
        margin-right: 0;
      }

      &:hover {
        background-position: 0 0;
      }
      &.selected {
        background-position: -70px 0;
        color: #d35757;
        .icon {
          background-position: -48px 0;
        }
      }

      span {
        display: block;
        margin-top: -1px;
      }
    }
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

export const RadioCategoryImage = styled.div<{ bgImage: string }>`
  width: 48px;
  height: 48px;
  margin: 0 auto;
  background-image: url(${(props) => props.bgImage});
`
