import {
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
  type FC,
  type ReactNode,
  type ReactElement,
  type CSSProperties,
} from 'react'

import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { TooltipArrow, TooltipContent } from './Tooltip.styles'

type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right'

interface TooltipProps {
  title: ReactNode
  children: ReactElement
  placement?: Placement
  color?: string
}

export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  color = '#fff',
}) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})
  const [arrowOffset, setArrowOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const gap = 12

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'topLeft':
        top = triggerRect.top - tooltipRect.height - gap
        left = triggerRect.left
        break
      case 'topRight':
        top = triggerRect.top - tooltipRect.height - gap
        left = triggerRect.right - tooltipRect.width
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottomLeft':
        top = triggerRect.bottom + gap
        left = triggerRect.left
        break
      case 'bottomRight':
        top = triggerRect.bottom + gap
        left = triggerRect.right - tooltipRect.width
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - gap
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + gap
        break
    }

    // 确保不超出视口
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const padding = 10

    if (left < padding) left = padding
    if (left + tooltipRect.width > viewportWidth - padding)
      left = viewportWidth - tooltipRect.width - padding
    if (top < padding) top = padding
    if (top + tooltipRect.height > viewportHeight - padding)
      top = viewportHeight - tooltipRect.height - padding

    setPosition({
      top: `${top}px`,
      left: `${left}px`,
    })

    // 计算箭头偏移量
    const triggerCenterX = triggerRect.left + triggerRect.width / 2
    const triggerCenterY = triggerRect.top + triggerRect.height / 2

    // 箭头边界距离（箭头宽度 10px 的一半 + 2px 安全边距）
    const arrowEdge = 7

    // 水平方向偏移（用于 top/bottom 系列），限制在 tooltip 宽度范围内
    const arrowX = Math.max(
      arrowEdge,
      Math.min(triggerCenterX - left, tooltipRect.width - arrowEdge)
    )
    // 垂直方向偏移（用于 left/right），限制在 tooltip 高度范围内
    const arrowY = Math.max(
      arrowEdge,
      Math.min(triggerCenterY - top, tooltipRect.height - arrowEdge)
    )

    setArrowOffset({ x: arrowX, y: arrowY })
  }, [placement])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        calculatePosition()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [visible, calculatePosition])

  // 使用 cloneElement 给子元素添加 ref 和事件，不改变布局
  const childProps = children.props as Record<string, unknown>
  const triggerElement = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      setVisible(true)
      if (typeof childProps.onMouseEnter === 'function') {
        childProps.onMouseEnter(e)
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setVisible(false)
      if (typeof childProps.onMouseLeave === 'function') {
        childProps.onMouseLeave(e)
      }
    },
  })
  const isHorizontal = placement === 'left' || placement === 'right'

  return (
    <>
      {triggerElement}

      {createPortal(
        <CSSTransition
          in={visible}
          timeout={200}
          classNames="tooltip"
          unmountOnExit
          nodeRef={tooltipRef}
          onEntering={() => calculatePosition()}
        >
          <TooltipContent ref={tooltipRef} style={position} $color={color}>
            {title}
            <TooltipArrow
              $placement={placement}
              $color={color}
              $offset={isHorizontal ? arrowOffset.y : arrowOffset.x}
            />
          </TooltipContent>
        </CSSTransition>,
        document.body
      )}
    </>
  )
}
