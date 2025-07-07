import styled, { css } from 'styled-components'

import type { SectionHeaderVariant } from './types'

const primaryStyles = css`
  background-position: -225px -156px;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  height: 33px;

  .title {
    font-size: 20px;
    font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
    margin-right: 20px;
  }

  .more-link {
    display: inline-block;
  }

  .icon {
    display: inline-block;
    background-position: 0 -240px;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    vertical-align: middle;
  }
`

const defaultStyles = css`
  height: 40px;
  border-bottom: 2px solid #c20c0c;

  .left {
    .title {
      font-size: 24px;
      line-height: 34px;
    }

    .sub-title {
      margin: 10px 0 0 10px;
      color: #999;
    }

    .tag-list {
      margin-left: 20px;

      .item .divider {
        margin: 0 10px;
      }
    }
  }

  .right {
    margin-top: 10px;
  }
`

const simpleStyles = css`
  height: 23px;
  border-bottom: 1px solid #ccc;

  .title {
    font-weight: bold;
  }
`

export const SectionHeaderWrapper = styled.div<{
  variant: SectionHeaderVariant
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    .tag-list {
      display: flex;

      .item {
        .tag {
          display: inline;
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }

        .divider {
          margin: 0 13px;
          color: #ccc;
        }
        &:last-child .divider {
          display: none;
        }
      }
    }
  }

  .right {
    align-items: center;

    .more-link {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return primaryStyles
      case 'simple':
        return simpleStyles
      default:
        return defaultStyles
    }
  }}
`
