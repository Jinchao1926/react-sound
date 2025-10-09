import styled, { css } from 'styled-components'

import type { SectionHeaderVariant } from './types'
import { Sprite } from '../UI'

export const SectionHeaderWrapper = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'redCircle',
})<{
  variant: SectionHeaderVariant
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          padding: 0 10px 0 34px;
          border-bottom: 2px solid #c10d0c;
          height: 33px;
        `
      case 'simple':
        return css`
          height: 23px;
          border-bottom: 1px solid #ccc;
        `
      default:
        return css`
          height: 40px;
          border-bottom: 2px solid #c20c0c;
        `
    }
  }}
`

export const PrimaryMore = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'more',
})`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  vertical-align: middle;
`

export const Title = styled.span<{ variant: SectionHeaderVariant }>`
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          font-size: 20px;
          font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
          margin-right: 20px;
        `
      case 'simple':
        return css`
          font-size: 12px;
          font-weight: bold;
        `
      default:
        return css`
          font-size: 24px;
          line-height: 34px;
        `
    }
  }}
`

export const SubTitle = styled.span`
  margin: 10px 0 0 10px;
  color: #999;
`

export const Divider = styled.span<{
  variant: SectionHeaderVariant
}>`
  margin: 0 ${({ variant }) => (variant === 'default' ? 10 : 13)}px;
  color: #ccc;
`
