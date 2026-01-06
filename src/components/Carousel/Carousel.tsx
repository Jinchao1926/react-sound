import {
  Children,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type ReactNode,
} from 'react'

import {
  CarouselContainer,
  CarouselDot,
  CarouselDots,
  CarouselSlide,
  CarouselTrack,
} from './Carousel.styles'
import { useCarousel } from './useCarousel'

export interface CarouselProps {
  /** Carousel items */
  children: ReactNode
  /** Animation effect */
  effect?: 'slide' | 'fade'
  /** Enable autoplay */
  autoplay?: boolean
  /** Autoplay speed in milliseconds */
  autoplaySpeed?: number
  /** Pause autoplay on hover */
  pauseOnHover?: boolean
  /** Show dot indicators */
  dots?: boolean | { className?: string }
  /** Dot position (not implemented, for API compatibility) */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** Callback before slide change */
  beforeChange?: (from: number, to: number) => void
  /** Callback after slide change */
  afterChange?: (to: number) => void
  /** Additional class name */
  className?: string
}

export interface CarouselRef {
  /** Go to previous slide */
  prev: () => void
  /** Go to next slide */
  next: () => void
  /** Go to specific slide */
  goTo: (index: number) => void
}

/**
 * Simple carousel component for image/content rotation
 * Supports both slide and fade effects with autoplay
 */
export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      effect = 'slide',
      autoplay = false,
      autoplaySpeed = 3000,
      pauseOnHover = false,
      dots = true,
      beforeChange,
      afterChange,
      className,
    },
    ref
  ) => {
    const childArray = Children.toArray(children) as ReactElement[]
    const total = childArray.length

    const carousel = useCarousel({
      total,
      autoplay,
      autoplaySpeed,
      pauseOnHover,
      beforeChange,
      afterChange,
    })

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      prev: carousel.prev,
      next: carousel.next,
      goTo: carousel.goTo,
    }))

    // Handle mouse enter/leave for pause on hover
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        carousel.pause()
      }
    }

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        carousel.resume()
      }
    }

    // Determine dots class name
    const dotsClassName = typeof dots === 'object' ? dots.className : undefined
    const showDots = dots !== false

    return (
      <CarouselContainer
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselTrack $effect={effect} $currentIndex={carousel.currentIndex}>
          {childArray.map((child, index) => (
            <CarouselSlide
              key={index}
              $effect={effect}
              $active={
                effect === 'fade' ? index === carousel.currentIndex : undefined
              }
            >
              {child}
            </CarouselSlide>
          ))}
        </CarouselTrack>

        {showDots && (
          <CarouselDots className={dotsClassName}>
            {childArray.map((_, index) => (
              <CarouselDot
                key={index}
                $active={index === carousel.currentIndex}
                onClick={() => carousel.goTo(index)}
              />
            ))}
          </CarouselDots>
        )}
      </CarouselContainer>
    )
  }
)

Carousel.displayName = 'Carousel'
