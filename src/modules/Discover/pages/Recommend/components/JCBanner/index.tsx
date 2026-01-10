import { type FC, useRef, useState, useEffect } from 'react'

import classNames from 'classnames'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { Box, Flex, FlexContainer } from '@/components/Core'
import { useBannersQuery } from '@/hooks/recommend/useBannersQuery'

import { BannerTransitionContainer } from './style'
import {
  BannerBackground,
  BannerControlContainer,
  BannerDot,
  BannerImage,
  LeftControl,
  RightControl,
} from '../Banner/Banner.styles'
import { DownloadClient } from '../Banner/DownloadClient'

export const JCBanner: FC = () => {
  // 定义组件内部数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [bgImage, setBgImage] = useState('')

  // 是否需要停止定时器，当轮播图焦点时停止
  const [isPaused, setIsPaused] = useState(false)
  // 是否需要重制定时器，当轮播图点击翻页时重制定时器
  const [refreshTimer, setRefreshTimer] = useState(false)

  // 持有 currentIndex 的引用，否则在定时器中获取到的 currentIndex 始终是 0
  const indexRef = useRef(currentIndex)
  // 确保组件在重新渲染的时候可以正确的清楚定时器，避免内存泄漏
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  // 从 redux 中获取数据
  const { data: banners } = useBannersQuery()
  // 更新 bgImage
  useEffect(() => {
    if (banners.length === 0) return
    setBgImage(`${banners[currentIndex].imageUrl}?imageView&blur=40x20`)
    setRefreshTimer(!refreshTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners])
  // 更新 imageUrl
  useEffect(() => {
    if (!banners.length) return
    setImageUrl(banners[currentIndex].imageUrl)
  }, [currentIndex, banners])

  // Timer
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(() => {
      handleTimer()
    }, 3000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTimer, isPaused])

  // 事件监听
  function handleTimer() {
    if (!banners.length) return
    indexRef.current = (indexRef.current + 1) % banners.length
    setCurrentIndex(indexRef.current)
  }

  function handlePreviousPressed() {
    indexRef.current = (indexRef.current - 1 + banners.length) % banners.length
    setCurrentIndex(indexRef.current)
    setRefreshTimer(!refreshTimer)
  }

  function handleNextPressed() {
    indexRef.current = (indexRef.current + 1) % banners.length
    setCurrentIndex(indexRef.current)
    setRefreshTimer(!refreshTimer)
  }

  function handleGoPressed(to: number) {
    indexRef.current = to % banners.length
    setCurrentIndex(indexRef.current)
    setRefreshTimer(!refreshTimer)
  }

  function handleAfterChange() {
    setBgImage(`${banners[indexRef.current].imageUrl}?imageView&blur=40x20`)
  }

  function handleMouseEnter() {
    setIsPaused(true)
  }

  function handleMouseLeave() {
    setIsPaused(false)
  }

  return (
    <BannerBackground bgImage={bgImage}>
      <FlexContainer position="relative" height={285}>
        <BannerTransitionContainer>
          <div
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
          >
            <SwitchTransition>
              <CSSTransition
                classNames="fade"
                timeout={300}
                key={currentIndex}
                onExit={() => handleAfterChange()}
              >
                <Box overflow="hidden" height={285}>
                  <BannerImage src={imageUrl} alt={imageUrl} />
                </Box>
              </CSSTransition>
            </SwitchTransition>
          </div>
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
                onClick={() => handleGoPressed(idx)}
              />
            ))}
          </Flex>
        </BannerTransitionContainer>

        <DownloadClient />

        <BannerControlContainer>
          <LeftControl onClick={() => handlePreviousPressed()} />
          <RightControl onClick={() => handleNextPressed()} />
        </BannerControlContainer>
      </FlexContainer>
    </BannerBackground>
  )
}
