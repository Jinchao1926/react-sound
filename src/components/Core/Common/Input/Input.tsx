import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { InputContainer, InputPrefix, StyledInput } from './Input.styles'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Prefix icon or element */
  prefix?: ReactNode
}

/**
 * Simple input component with optional prefix icon support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ prefix, className, ...props }, ref) => {
    return (
      <InputContainer className={className}>
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <StyledInput ref={ref} $hasPrefix={!!prefix} {...props} />
      </InputContainer>
    )
  }
)

Input.displayName = 'Input'
