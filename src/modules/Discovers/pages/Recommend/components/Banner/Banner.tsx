import { ElementRef, FC, useEffect, useRef, useState } from 'react'

import { Carousel } from 'antd'
import classNames from 'classnames'

import { useBannersQuery } from '@/hooks/recommend/useBannersQuery'

import {
  BannerControl,
  BannerLeft,
  BannerRight,
  BannerWrapper,
} from './Banner.styles'

export const Banner: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const { data: banners } = useBannersQuery()

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
            {banners.map((item) => (
              <div className="banner-item" key={item.imageUrl}>
                <img
                  className="image"
                  src={item.imageUrl}
                  alt={item.typeTitle}
                />
              </div>
            ))}
          </Carousel>
          {/* 自定义走马灯 Dot */}
          <ul className="dots">
            {banners.map((item, idx) => (
              <li key={item.imageUrl}>
                <button
                  className={classNames('item', {
                    active: currentIndex === idx,
                  })}
                  onClick={() => bannerRef.current?.goTo(idx)}
                />
              </li>
            ))}
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
