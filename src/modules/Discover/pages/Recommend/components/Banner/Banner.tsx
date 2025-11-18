import { ElementRef, FC, useMemo, useRef, useState } from 'react'

import { Carousel } from 'antd'
import classNames from 'classnames'

import { Box, Flex, FlexContainer } from '@/components/Core'
import { useBannersQuery } from '@/hooks/recommend/useBannersQuery'

import {
  BannerBackground,
  BannerControlContainer,
  BannerDot,
  BannerImage,
  LeftControl,
  RightControl,
} from './Banner.styles'
import { DownloadClient } from './DownloadClient'

export const Banner: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  const { data: banners } = useBannersQuery()

  const bgImage = useMemo(() => {
    if (currentIndex >= banners.length) return undefined

    return banners[currentIndex].imageUrl + '?imageView&blur=40x20'
  }, [banners, currentIndex])

  // 事件监听
  function handleBeforeChange(from: number, to: number) {
    setCurrentIndex(to)
  }

  // eslint-disable-next-line no-unused-vars
  function handleAfterChange(to: number) {
    // setCurrentIndex(to)
  }

  return (
    <BannerBackground bgImage={bgImage}>
      <FlexContainer position="relative" height={285}>
        <Box width={730}>
          <Carousel
            effect="fade"
            autoplay={true}
            ref={bannerRef}
            pauseOnHover={true}
            pauseOnDotsHover={true}
            dotPosition="top"
            dots={false}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners.map((item) => (
              <Box key={item.imageUrl} overflow="hidden" height={285}>
                <BannerImage src={item.imageUrl} alt={item.typeTitle} />
              </Box>
            ))}
          </Carousel>
          {/* 自定义走马灯 Dot */}
          <Flex
            position="absolute"
            bottom={5}
            width={730}
            justifyContent="center"
          >
            {banners.map((item, idx) => (
              <BannerDot
                key={item.imageUrl}
                className={classNames({
                  active: currentIndex === idx,
                })}
                onClick={() => bannerRef.current?.goTo(idx)}
              />
            ))}
          </Flex>
        </Box>

        <DownloadClient />

        <BannerControlContainer>
          <LeftControl onClick={() => bannerRef.current?.prev()} />
          <RightControl onClick={() => bannerRef.current?.next()} />
        </BannerControlContainer>
      </FlexContainer>
    </BannerBackground>
  )
}
