import styled, { css } from 'styled-components'

import type { Placement } from './useFloatingPosition'

interface FloatingContentProps {
  $color: string
  $padding?: string
  $fontSize?: string
  $borderRadius?: string
  $minWidth?: string
  $maxWidth?: string
  $pointerEvents?: 'none' | 'auto'
}

export const FloatingContent = styled.div<FloatingContentProps>`
  position: fixed;
  z-index: 1070;
  min-width: ${({ $minWidth }) => $minWidth || 'auto'};
  max-width: ${({ $maxWidth }) => $maxWidth || 'none'};
  padding: ${({ $padding }) => $padding};
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: 1.5;
  color: ${({ $color }) => ($color === '#fff' ? '#333' : '#fff')};
  background-color: ${({ $color }) => $color};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: ${({ $pointerEvents }) => $pointerEvents || 'auto'};

  /* Initial position off-screen, waiting for position calculation */
  top: -9999px;
  left: -9999px;

  /* CSSTransition animations */
  &.floating-enter {
    opacity: 0;
    transform: translateY(-4px);
  }

  &.floating-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  &.floating-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.floating-exit-active {
    opacity: 0;
    transform: translateY(-4px);
    transition:
      opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`

interface FloatingArrowProps {
  $placement: Placement
  $color: string
  $offset: number
}

export const FloatingArrow = styled.div<FloatingArrowProps>`
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
