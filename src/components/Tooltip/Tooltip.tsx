import { useState, type FC, type ReactNode, type ReactElement } from 'react'

import { BaseFloating, type Placement } from '../BaseFloating'

interface TooltipProps {
  /** Content to display in the tooltip */
  title: ReactNode
  /** Element that triggers the tooltip */
  children: ReactElement
  /** Placement position of the tooltip */
  placement?: Placement
  /** Background color of the tooltip */
  color?: string
}

/**
 * Tooltip component for displaying simple hover hints
 * - Trigger: hover only
 * - Non-interactive (pointer-events: none)
 * - Compact styling with smaller font and padding
 */
export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  color = '#fff',
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <BaseFloating
      content={title}
      placement={placement}
      color={color}
      visible={visible}
      styleProps={{
        maxWidth: '300px',
        padding: '8px 12px',
        fontSize: '12px',
        borderRadius: '4px',
        pointerEvents: 'none',
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
    </BaseFloating>
  )
}
