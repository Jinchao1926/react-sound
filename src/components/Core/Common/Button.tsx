import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FC,
  type PropsWithChildren,
} from 'react'

import styled from 'styled-components'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'default' | 'text' | 'link'
  size?: 'small' | 'medium' | 'large'
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
}

interface StyledButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  buttonType?: 'primary' | 'default' | 'text' | 'link'
  size?: 'small' | 'medium' | 'large'
  shape?: 'default' | 'circle' | 'round'
}

const StyledButton = styled.button
  .withConfig({
    shouldForwardProp: (prop) =>
      !['buttonType', 'size', 'shape'].includes(prop as string),
  })
  .attrs<StyledButtonProps>((props) => {
    const { buttonType = 'default', size = 'medium', shape = 'default' } = props

    const style: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
      fontWeight: 400,
      cursor: 'pointer',
      transition: 'all 0.2s',
      outline: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      lineHeight: 1.5,
    }

    // Size styles
    const sizeConfig = {
      small: { padding: '4px 12px', fontSize: '12px', height: '24px' },
      medium: { padding: '6px 16px', fontSize: '14px', height: '32px' },
      large: { padding: '10px 24px', fontSize: '16px', height: '40px' },
    }
    const sizeStyle = sizeConfig[size]
    style.padding = sizeStyle.padding
    style.fontSize = sizeStyle.fontSize
    style.height = sizeStyle.height

    // Shape styles
    switch (shape) {
      case 'circle':
        style.borderRadius = '50%'
        style.width = sizeStyle.height
        style.padding = '0'
        break
      case 'round':
        style.borderRadius = sizeStyle.height
        break
      default:
        style.borderRadius = '4px'
    }

    // Button type styles
    switch (buttonType) {
      case 'primary':
        style.backgroundColor = '#c20c0c'
        style.color = '#fff'
        style.border = '1px solid #c20c0c'
        break
      case 'text':
        style.backgroundColor = 'transparent'
        style.color = '#333'
        style.border = 'none'
        break
      case 'link':
        style.backgroundColor = 'transparent'
        style.color = '#c20c0c'
        style.border = 'none'
        style.position = 'relative'
        break
      case 'default':
      default:
        style.backgroundColor = '#fff'
        style.color = '#333'
        style.border = '1px solid #d9d9d9'
    }

    return { style }
  })<StyledButtonProps>`
  &:hover:not(:disabled) {
    ${({ buttonType }) => {
      switch (buttonType) {
        case 'primary':
          return 'background-color: #d81e1e; border-color: #d81e1e;'
        case 'text':
          return 'background-color: #f5f5f5;'
        case 'link':
          return 'color: #d81e1e;'
        case 'default':
        default:
          return 'background-color: #f0f0f0; border-color: #c20c0c; color: #c20c0c;'
      }
    }}
  }

  &:hover:not(:disabled)::after {
    ${({ buttonType }) =>
      buttonType === 'link'
        ? `content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px; background-color: #d81e1e;`
        : 'display: none;'}
  }

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
