import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import {
  GreyButtonSpan,
  GreyButtonText,
  GreyButtonWrapper,
} from './GreyButton.styles'

interface GreyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  width?: number
  padding?: string
  color?: string
}

export const GreyButton: FC<PropsWithChildren<GreyButtonProps>> = ({
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
