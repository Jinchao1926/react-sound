import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

export type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right'

interface UseFloatingPositionProps {
  triggerRef: RefObject<HTMLElement>
  floatingRef: RefObject<HTMLDivElement>
  placement: Placement
  visible: boolean
}

interface UseFloatingPositionReturn {
  position: CSSProperties
  arrowOffset: { x: number; y: number }
  calculatePosition: () => void
}

/**
 * Hook for calculating floating element position and arrow offset
 * Handles viewport boundary detection and dynamic arrow positioning
 */
export const useFloatingPosition = ({
  triggerRef,
  floatingRef,
  placement,
  visible,
}: UseFloatingPositionProps): UseFloatingPositionReturn => {
  const [position, setPosition] = useState<CSSProperties>({})
  const [arrowOffset, setArrowOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const floatingRect = floatingRef.current.getBoundingClientRect()
    const gap = 12

    let top = 0
    let left = 0

    // Calculate floating element position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top - floatingRect.height - gap
        left = triggerRect.left + (triggerRect.width - floatingRect.width) / 2
        break
      case 'topLeft':
        top = triggerRect.top - floatingRect.height - gap
        left = triggerRect.left
        break
      case 'topRight':
        top = triggerRect.top - floatingRect.height - gap
        left = triggerRect.right - floatingRect.width
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + (triggerRect.width - floatingRect.width) / 2
        break
      case 'bottomLeft':
        top = triggerRect.bottom + gap
        left = triggerRect.left
        break
      case 'bottomRight':
        top = triggerRect.bottom + gap
        left = triggerRect.right - floatingRect.width
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - floatingRect.height) / 2
        left = triggerRect.left - floatingRect.width - gap
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - floatingRect.height) / 2
        left = triggerRect.right + gap
        break
    }

    // Ensure floating element stays within viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const padding = 10

    if (left < padding) left = padding
    if (left + floatingRect.width > viewportWidth - padding)
      left = viewportWidth - floatingRect.width - padding
    if (top < padding) top = padding
    if (top + floatingRect.height > viewportHeight - padding)
      top = viewportHeight - floatingRect.height - padding

    setPosition({
      top: `${top}px`,
      left: `${left}px`,
    })

    // Calculate arrow offset to point to trigger element center
    const triggerCenterX = triggerRect.left + triggerRect.width / 2
    const triggerCenterY = triggerRect.top + triggerRect.height / 2

    // Arrow edge distance (arrow width 10px / 2 + 2px safety margin)
    const arrowEdge = 7

    // Horizontal offset (for top/bottom placements), constrained within floating width
    const arrowX = Math.max(
      arrowEdge,
      Math.min(triggerCenterX - left, floatingRect.width - arrowEdge)
    )
    // Vertical offset (for left/right placements), constrained within floating height
    const arrowY = Math.max(
      arrowEdge,
      Math.min(triggerCenterY - top, floatingRect.height - arrowEdge)
    )

    setArrowOffset({ x: arrowX, y: arrowY })
  }, [placement, triggerRef, floatingRef])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        calculatePosition()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [visible, calculatePosition])

  return {
    position,
    arrowOffset,
    calculatePosition,
  }
}
