import React, { ElementRef, memo, useState, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'

import { Carousel } from 'antd'
import classNames from 'classnames'
import { shallowEqual } from 'react-redux'

import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  // 定义组件内部数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // 从 redux 中获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners,
    }),
    shallowEqual
  )

  useEffect(() => {
    if (currentIndex >= 0 && banners.length > 0) {
      const bgImageUrl =
        banners[currentIndex].imageUrl + '?imageView&blur=40x20'
      bgRef.current!.style.backgroundImage = `url(${bgImageUrl})`
    }
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
    <BannerWrapper ref={bgRef}>
      <div className="banner wrap-v2">
        <BannerLeft>
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
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          {/* 自定义走马灯 Dot */}
          <ul className="dots">
            {banners.map((item, idx) => {
              return (
                <li key={item.imageUrl}>
                  <button
                    className={classNames('item', {
                      active: currentIndex === idx,
                    })}
                    onClick={() => bannerRef.current?.goTo(idx)}
                  />
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={() => bannerRef.current?.prev()}
          ></button>
          <button
            className="btn right"
            onClick={() => bannerRef.current?.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(Banner)
