import {
  type ButtonHTMLAttributes,
  type FC,
  type PropsWithChildren,
} from 'react'

import {
  GreyButtonSpan,
  GreyButtonText,
  GreyButtonWrapper,
} from './SpriteGreyButton.styles'

interface SpriteGreyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  width?: number
  padding?: string
  color?: string
}

export const SpriteGreyButton: FC<PropsWithChildren<SpriteGreyButtonProps>> = ({
  icon,
  width,
  padding,
  color,
  children,
  ...restProps
}) => {
  const contentProps = {
    className: 'grey-button-content',
    width,
    padding,
    color,
    children,
  }

  return (
    <GreyButtonWrapper {...restProps}>
      {icon ? (
        <GreyButtonText icon={icon} {...contentProps} />
      ) : (
        <GreyButtonSpan {...contentProps} />
      )}
    </GreyButtonWrapper>
  )
}
