import React, { FC, useRef, useState, useEffect } from 'react'

import classNames from 'classnames'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { useBannersQuery } from '@/hooks/recommend/useBannersQuery'

import {
  JCBannerControl,
  JCBannerLeft,
  JCBannerRight,
  JCBannerWrapper,
} from './style'

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
    setBgImage(banners[currentIndex].imageUrl + '?imageView&blur=40x20')
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
    // eslint-disable-next-line no-console
    console.log('useEffect isPaused:', isPaused)
    if (isPaused) return
    timerRef.current = setInterval(() => {
      handleTimer()
    }, 3000)

    return () => {
      // eslint-disable-next-line no-console
      console.log('useEffect return ')
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
    setBgImage(banners[indexRef.current].imageUrl + '?imageView&blur=40x20')
  }

  function handleMouseEnter() {
    setIsPaused(true)
  }

  function handleMouseLeave() {
    setIsPaused(false)
  }

  return (
    <JCBannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <JCBannerLeft>
          <div
            className="banner-list"
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
                <div className="banner-item">
                  <img className="image" src={imageUrl} alt="" />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <ul className="dots">
            {banners.map((item, idx) => {
              return (
                <li key={item.imageUrl}>
                  <button
                    className={classNames('item', {
                      active: currentIndex === idx,
                    })}
                    onClick={() => handleGoPressed(idx)}
                  />
                </li>
              )
            })}
          </ul>
        </JCBannerLeft>
        <JCBannerRight>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </JCBannerRight>
        <JCBannerControl>
          <button
            className="btn left"
            onClick={() => handlePreviousPressed()}
          ></button>
          <button
            className="btn right"
            onClick={() => handleNextPressed()}
          ></button>
        </JCBannerControl>
      </div>
    </JCBannerWrapper>
  )
}
