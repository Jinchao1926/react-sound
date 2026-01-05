import {
  type ButtonHTMLAttributes,
  type FC,
  type PropsWithChildren,
} from 'react'

import styled, { css } from 'styled-components'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'default' | 'text' | 'link'
  size?: 'small' | 'medium' | 'large'
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
}

const getButtonStyles = (buttonType: ButtonProps['type']) => {
  switch (buttonType) {
    case 'primary':
      return css`
        background-color: #c20c0c;
        color: #fff;
        border: 1px solid #c20c0c;

        &:hover:not(:disabled) {
          background-color: #d81e1e;
          border-color: #d81e1e;
        }
      `

    case 'text':
      return css`
        background-color: transparent;
        color: #333;
        border: none;

        &:hover:not(:disabled) {
          background-color: #f5f5f5;
        }
      `

    case 'link':
      return css`
        background-color: transparent;
        color: #c20c0c;
        border: none;
        position: relative;

        &:hover:not(:disabled) {
          color: #d81e1e;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 1px;
            background-color: #d81e1e;
          }
        }
      `

    case 'default':
    default:
      return css`
        background-color: #fff;
        color: #333;
        border: 1px solid #d9d9d9;

        &:hover:not(:disabled) {
          background-color: #f0f0f0;
          border-color: #c20c0c;
          color: #c20c0c;
        }
      `
  }
}

const getSizeStyles = (
  size: ButtonProps['size'],
  shape: ButtonProps['shape']
) => {
  const baseStyles = {
    small: { padding: '4px 12px', fontSize: '12px', height: '24px' },
    medium: { padding: '6px 16px', fontSize: '14px', height: '32px' },
    large: { padding: '10px 24px', fontSize: '16px', height: '40px' },
  }

  const current = baseStyles[size || 'medium']

  return css`
    padding: ${current.padding};
    font-size: ${current.fontSize};
    height: ${current.height};
    line-height: 1.5;
    ${getShapeStyles(shape, current.height)}
  `
}

const getShapeStyles = (shape: ButtonProps['shape'], height: string) => {
  switch (shape) {
    case 'circle':
      return css`
        border-radius: 50%;
        width: ${height};
        padding: 0;
      `
    case 'round':
      return css`
        border-radius: ${height};
      `
    case 'default':
    default:
      return css`
        border-radius: 4px;
      `
  }
}

interface StyledButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  buttonType?: 'primary' | 'default' | 'text' | 'link'
  size?: 'small' | 'medium' | 'large'
  shape?: 'default' | 'circle' | 'round'
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['buttonType', 'size', 'shape'].includes(prop as string),
})<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  user-select: none;
  white-space: nowrap;

  ${({ size, shape }) => getSizeStyles(size, shape)}
  ${({ buttonType }) => getButtonStyles(buttonType)}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid #c20c0c;
    outline-offset: 2px;
  }
`

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  type: buttonType = 'default',
  size = 'medium',
  shape = 'default',
  children,
  ...props
}) => {
  return (
    <StyledButton
      type="button"
      buttonType={buttonType}
      size={size}
      shape={shape}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
