import React, { memo, useCallback, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'

import { useAppSelector } from '@/store'

import { PlaylistHeaderWrapper, HeaderLeft, HeaderRight } from './style'
import PlaylistCategory from '../playlist-category'

interface IProps {
  children?: ReactNode
}

const PlaylistHeader: FC<IProps> = () => {
  // redux
  const [showCategory, setShowCategory] = useState<boolean>(false)
  const currentCategory = useAppSelector(
    (state) => state.playlist.currentCategory,
    shallowEqual
  )

  // handle
  const switchCategory = useCallback(() => {
    setShowCategory(!showCategory)
  }, [showCategory])
  const onSelectedCategory = useCallback(() => {
    setShowCategory(false)
  }, [])

  return (
    <PlaylistHeaderWrapper>
      <HeaderLeft>
        <span className="title">{currentCategory}</span>
        <button className="select sprite_button" onClick={switchCategory}>
          <span className="sprite_button">
            选择分类
            <i className="sprite_icon2" />
          </span>
        </button>
        {showCategory && (
          <PlaylistCategory onCategorySelect={onSelectedCategory} />
        )}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot sprite_button2">热门</button>
      </HeaderRight>
    </PlaylistHeaderWrapper>
  )
}

export default memo(PlaylistHeader)
