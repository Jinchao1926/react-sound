import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  type FC,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react'

import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { FloatingArrow, FloatingContent } from './BaseFloating.styles'
import { useFloatingPosition, type Placement } from './useFloatingPosition'

interface BaseFloatingStyleProps {
  padding?: string
  fontSize?: string
  borderRadius?: string
  minWidth?: string
  maxWidth?: string
  pointerEvents?: 'none' | 'auto'
}

export interface BaseFloatingProps {
  /** Content to display in the floating element */
  content: ReactNode
  /** Element that triggers the floating element */
  children: ReactElement
  /** Placement position of the floating element */
  placement?: Placement
  /** Background color of the floating element */
  color?: string
  /** Whether the floating element is visible */
  visible: boolean
  /** Callback to change visibility state */
  onVisibleChange?: (visible: boolean) => void
  /** Close floating element when clicking outside */
  closeOnClickOutside?: boolean
  /** Style configuration for the floating element */
  styleProps?: BaseFloatingStyleProps
  /** Optional external ref for the floating element */
  floatingRef?: RefObject<HTMLDivElement>
  /** Mouse enter event handler */
  onMouseEnter?: () => void
  /** Mouse leave event handler */
  onMouseLeave?: () => void
  /** Click event handler */
  onClick?: () => void
}

/**
 * Base floating component for tooltips and popovers
 * Provides shared positioning, animation, and rendering logic
 */
export const BaseFloating: FC<BaseFloatingProps> = ({
  content,
  children,
  placement = 'top',
  color = '#fff',
  visible,
  onVisibleChange,
  closeOnClickOutside = false,
  styleProps = {},
  floatingRef: externalFloatingRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const triggerRef = useRef<HTMLElement>(null)
  const internalFloatingRef = useRef<HTMLDivElement>(null)

  // Use external ref if provided, otherwise use internal ref
  const floatingRef = externalFloatingRef || internalFloatingRef

  const { position, arrowOffset, calculatePosition } = useFloatingPosition({
    triggerRef,
    floatingRef,
    placement,
    visible,
  })

  // Determine if placement is horizontal (left/right) for arrow offset calculation
  const isHorizontal = placement === 'left' || placement === 'right'

  // Use requestAnimationFrame to ensure layout is complete before calculating position
  const handleEntering = useCallback(() => {
    requestAnimationFrame(() => {
      calculatePosition()
    })
  }, [calculatePosition])

  const handleEntered = useCallback(() => {
    calculatePosition()
  }, [calculatePosition])

  // Click outside to close
  useEffect(() => {
    if (!visible || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        floatingRef.current &&
        !floatingRef.current.contains(target)
      ) {
        onVisibleChange?.(false)
      }
    }

    // Use setTimeout to avoid immediate trigger (when clicking trigger element)
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [visible, closeOnClickOutside, onVisibleChange])

  // Get child element's original props
  const childProps = children.props as Record<string, unknown>

  // Merge event handlers: call both BaseFloating handlers and original child handlers
  const handleMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter?.()
    if (typeof childProps.onMouseEnter === 'function') {
      childProps.onMouseEnter(e)
    }
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    onMouseLeave?.()
    if (typeof childProps.onMouseLeave === 'function') {
      childProps.onMouseLeave(e)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    onClick?.()
    if (typeof childProps.onClick === 'function') {
      childProps.onClick(e)
    }
  }

  // Clone child element with merged event handlers
  const triggerElement = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
  })

  return (
    <>
      {triggerElement}

      {createPortal(
        <CSSTransition
          in={visible}
          timeout={200}
          classNames="floating"
          unmountOnExit
          nodeRef={floatingRef}
          onEntering={handleEntering}
          onEntered={handleEntered}
        >
          <FloatingContent
            ref={floatingRef}
            style={position}
            $color={color}
            $padding={styleProps.padding}
            $fontSize={styleProps.fontSize}
            $borderRadius={styleProps.borderRadius}
            $minWidth={styleProps.minWidth}
            $maxWidth={styleProps.maxWidth}
            $pointerEvents={styleProps.pointerEvents}
          >
            {content}
            <FloatingArrow
              $placement={placement}
              $color={color}
              $offset={isHorizontal ? arrowOffset.y : arrowOffset.x}
            />
          </FloatingContent>
        </CSSTransition>,
        document.body
      )}
    </>
  )
}
