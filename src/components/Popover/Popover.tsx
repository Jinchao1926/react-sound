import {
  useState,
  useCallback,
  type FC,
  type ReactNode,
  type ReactElement,
} from 'react'

import { BaseFloating, type Placement } from '../BaseFloating'

type Trigger = 'hover' | 'click'

interface PopoverProps {
  /** Content to display in the popover */
  content: ReactNode
  /** Element that triggers the popover */
  children: ReactElement
  /** Placement position of the popover */
  placement?: Placement
  /** Trigger method: hover or click */
  trigger?: Trigger
  /** Background color of the popover */
  color?: string
  /** Controlled mode: whether the popover is visible */
  open?: boolean
  /** Callback when visibility changes */
  onOpenChange?: (open: boolean) => void
}

/**
 * Popover component for displaying interactive content
 * - Trigger: hover or click
 * - Supports controlled and uncontrolled modes
 * - Interactive with larger font and padding
 * - Supports click-outside-to-close in click mode
 */
export const Popover: FC<PopoverProps> = ({
  content,
  children,
  placement = 'top',
  trigger = 'hover',
  color = '#fff',
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)

  // Use controlled mode or uncontrolled mode
  const visible = controlledOpen !== undefined ? controlledOpen : internalOpen

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen)
      } else {
        setInternalOpen(newOpen)
      }
    },
    [onOpenChange]
  )

  return (
    <BaseFloating
      content={content}
      placement={placement}
      color={color}
      visible={visible}
      onVisibleChange={handleOpenChange}
      closeOnClickOutside={trigger === 'click'}
      styleProps={{
        minWidth: '150px',
        padding: '12px 16px',
        fontSize: '14px',
        borderRadius: '8px',
      }}
      onMouseEnter={() => {
        if (trigger === 'hover') {
          handleOpenChange(true)
        }
      }}
      onMouseLeave={() => {
        if (trigger === 'hover') {
          handleOpenChange(false)
        }
      }}
      onClick={() => {
        if (trigger === 'click') {
          handleOpenChange(!visible)
        }
      }}
    >
      {children}
    </BaseFloating>
  )
}
