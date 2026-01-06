import styled, { css } from 'styled-components'

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

interface CarouselTrackProps {
  $effect: 'slide' | 'fade'
  $currentIndex: number
  $disableTransition?: boolean
}

export const CarouselTrack = styled.div<CarouselTrackProps>`
  ${({ $effect, $currentIndex, $disableTransition }) => {
    if ($effect === 'slide') {
      return css`
        display: flex;
        height: 100%;
        transform: translateX(-${$currentIndex * 100}%);
        transition: ${$disableTransition
          ? 'none'
          : 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)'};
      `
    }

    // fade effect: track is just a container
    return css`
      position: relative;
      width: 100%;
      height: 100%;
    `
  }}
`

interface CarouselSlideProps {
  $effect: 'slide' | 'fade'
  $active?: boolean
}

export const CarouselSlide = styled.div<CarouselSlideProps>`
  ${({ $effect, $active }) => {
    if ($effect === 'slide') {
      return css`
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
      `
    }

    // fade effect: absolute positioning with opacity
    return css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: ${$active ? 1 : 0};
      transition: opacity 0.5s ease-in-out;
      pointer-events: ${$active ? 'auto' : 'none'};
      z-index: ${$active ? 1 : 0};
    `
  }}
`

export const CarouselDots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 2;
`

interface CarouselDotProps {
  $active: boolean
}

export const CarouselDot = styled.button<CarouselDotProps>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background-color: ${({ $active }) => ($active ? '#c20c0c' : '#aaa')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #c20c0c;
  }
`
