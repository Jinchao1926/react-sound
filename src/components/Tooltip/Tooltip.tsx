import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FC,
  type ReactNode,
  type CSSProperties,
} from 'react'

import { createPortal } from 'react-dom'

import { TooltipArrow, TooltipContent, TooltipWrapper } from './Tooltip.styles'

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
  children: ReactNode
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
  const [arrowOffset, setArrowOffset] = useState<number>(0)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    // 获取实际触发元素（子元素）的位置
    const triggerElement =
      triggerRef.current.firstElementChild || triggerRef.current
    const triggerRect = triggerElement.getBoundingClientRect()
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
        left = triggerRect.left - gap
        break
      case 'topRight':
        top = triggerRect.top - tooltipRect.height - gap
        left = triggerRect.right - tooltipRect.width + gap
        break
      case 'bottom':
        top = triggerRect.bottom + gap
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottomLeft':
        top = triggerRect.bottom + gap
        left = triggerRect.left - gap
        break
      case 'bottomRight':
        top = triggerRect.bottom + gap
        left = triggerRect.right - tooltipRect.width + gap
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

    if (left < 0) left = 10
    if (left + tooltipRect.width > viewportWidth)
      left = viewportWidth - tooltipRect.width - 10
    if (top < 0) top = 10
    if (top + tooltipRect.height > viewportHeight)
      top = viewportHeight - tooltipRect.height - 10

    // 使用 fixed 定位，不需要加 scrollY/scrollX
    setPosition({
      top: `${top}px`,
      left: `${left}px`,
    })

    // 计算箭头偏移量，让箭头指向触发元素中心
    const triggerCenterX = triggerRect.left + triggerRect.width / 2
    const tooltipLeftEdge = left
    const arrowOffsetFromLeft = triggerCenterX - tooltipLeftEdge
    setArrowOffset(arrowOffsetFromLeft)
  }, [placement])

  useEffect(() => {
    if (visible) {
      // 使用 setTimeout 确保 tooltip 内容已渲染
      const timer = setTimeout(() => {
        calculatePosition()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [visible, calculatePosition])

  return (
    <>
      <TooltipWrapper
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </TooltipWrapper>

      {visible &&
        createPortal(
          <TooltipContent
            ref={tooltipRef}
            style={position}
            $visible={visible}
            $color={color}
          >
            {title}
            <TooltipArrow
              $placement={placement}
              $color={color}
              $offset={arrowOffset}
            />
          </TooltipContent>,
          document.body
        )}
    </>
  )
}
