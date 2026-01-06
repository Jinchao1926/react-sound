import {
  Children,
  forwardRef,
  useImperativeHandle,
  useState,
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

    // For seamless loop: clone first and last slides
    // DOM order: [Clone(last)] [0] [1] ... [n-1] [Clone(first)]
    const slidesWithClones =
      effect === 'slide' && total > 1
        ? [
            childArray[total - 1], // Clone of last slide
            ...childArray,
            childArray[0], // Clone of first slide
          ]
        : childArray

    const carousel = useCarousel({
      total,
      autoplay,
      autoplaySpeed,
      pauseOnHover,
      beforeChange,
      afterChange,
    })

    // Track if we're currently resetting position (disable transition during reset)
    const [isResetting, setIsResetting] = useState(false)

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

    // Handle transition end to reset display index for seamless loop
    const handleTransitionEnd = () => {
      if (
        effect === 'slide' &&
        total > 1 &&
        carousel.displayIndex !== carousel.currentIndex
      ) {
        // Disable transition and reset to actual position
        setIsResetting(true)

        // Use requestAnimationFrame to ensure transition is disabled before reset
        requestAnimationFrame(() => {
          carousel.resetDisplayIndex()

          // Re-enable transition after reset
          requestAnimationFrame(() => {
            setIsResetting(false)
          })
        })
      }
    }

    // Calculate display index for transform
    // For slide effect with clones: offset by 1 (because clone of last is at index 0)
    const transformIndex =
      effect === 'slide' && total > 1
        ? carousel.displayIndex + 1
        : carousel.displayIndex

    // Determine dots class name
    const dotsClassName = typeof dots === 'object' ? dots.className : undefined
    const showDots = dots !== false

    return (
      <CarouselContainer
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselTrack
          $effect={effect}
          $currentIndex={transformIndex}
          $disableTransition={isResetting}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesWithClones.map((child, index) => {
            // For slide effect with clones, adjust active state
            let isActive = false
            if (effect === 'fade') {
              isActive = index === carousel.currentIndex
            }

            return (
              <CarouselSlide
                key={`slide-${index}`}
                $effect={effect}
                $active={isActive ? isActive : undefined}
              >
                {child}
              </CarouselSlide>
            )
          })}
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
