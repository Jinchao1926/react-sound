import styled, { css } from 'styled-components'

interface TooltipContentProps {
  $color: string
}

export const TooltipContent = styled.div<TooltipContentProps>`
  position: fixed;
  z-index: 1070;
  max-width: 300px;
  padding: 8px 12px;
  font-size: 12px;
  line-height: 1.6;
  color: ${({ $color }) => ($color === '#fff' ? '#333' : '#fff')};
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: none;

  /* CSSTransition 动画 */
  &.tooltip-enter {
    opacity: 0;
    transform: translateY(-4px);
  }

  &.tooltip-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  &.tooltip-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.tooltip-exit-active {
    opacity: 0;
    transform: translateY(-4px);
    transition:
      opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`

interface TooltipArrowProps {
  $placement: string
  $color: string
  $offset: number
}

export const TooltipArrow = styled.div<TooltipArrowProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${({ $color }) => $color};
  transform: rotate(45deg);
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);

  ${({ $placement, $offset }) => {
    switch ($placement) {
      case 'top':
      case 'topLeft':
      case 'topRight':
        return css`
          bottom: -5px;
          left: ${$offset}px;
          margin-left: -5px;
          transform: rotate(45deg);
        `
      case 'bottom':
      case 'bottomLeft':
      case 'bottomRight':
        return css`
          top: -5px;
          left: ${$offset}px;
          margin-left: -5px;
          transform: rotate(45deg);
        `
      case 'left':
        return css`
          right: -5px;
          top: ${$offset}px;
          margin-top: -5px;
          transform: rotate(45deg);
        `
      case 'right':
        return css`
          left: -5px;
          top: ${$offset}px;
          margin-top: -5px;
          transform: rotate(45deg);
        `
      default:
        return ''
    }
  }}
`
