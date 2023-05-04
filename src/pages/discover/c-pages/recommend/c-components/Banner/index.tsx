import React, { ElementRef, memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@/store';

import { Carousel } from 'antd';
import { 
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style'

import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  // 定义组件内部数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const bgImageRef = useRef<string>()

  // 从 redux 中获取数据
  const { banners } = useAppSelector(
    (state) => ({ 
      banners: state.recommend.banners 
    }), 
    shallowEqual
  )

  if (currentIndex >= 0 && banners.length > 0) {
    bgImageRef.current = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
  }

  // 事件监听
  function handleBeforeChange(from: number, to: number) {
    setCurrentIndex(to)
  }

  function handleAfterChange(to: number) {
    // setCurrentIndex(to)
  }

  return (
    <BannerWrapper bgImage={bgImageRef.current}>
      <div className='banner wrap-v2'>
        <BannerLeft>
          <Carousel 
            effect="fade" 
            autoplay={true}
            ref={bannerRef}
            pauseOnHover={true}
            pauseOnDotsHover={true}
            dotPosition='top'
            dots={false}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {
              banners.map((item) => {
                return (
                  <div className='banner-item' key={item.imageUrl}>
                    <img 
                      className='image' 
                      src={item.imageUrl} 
                      alt={item.typeTitle}
                    />
                  </div>
                )
              })
            }
          </Carousel>
          {/* 自定义走马灯 Dot */}
          <ul className='dots'>
            {
              banners.map((item, idx) => {
                return (
                  <li key={item.imageUrl}>
                    <button 
                      className={classNames('item', {active: currentIndex === idx})}
                      onClick={e => bannerRef.current?.goTo(idx)}
                    />
                  </li>
                )
              })
            }
          </ul>
        </BannerLeft>
        <BannerRight>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </BannerRight>
        <BannerControl>
          <button className='btn left' onClick={e => bannerRef.current?.prev()}></button>
          <button className='btn right' onClick={e => bannerRef.current?.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(Banner)