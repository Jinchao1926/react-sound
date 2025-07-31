import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useRef,
  memo,
} from 'react'

import { useLocation } from 'react-router-dom'

import {
  PlaylistHeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './PlaylistHeader.styles'
import { PlaylistCategory } from '../PlaylistCategory'

const PlaylistHeader: FC<{ category: string }> = ({ category }) => {
  const location = useLocation()
  const [showCategory, setShowCategory] = useState<boolean>(false)
  const categoryRef = useRef<HTMLDivElement>(null)

  const switchCategory = useCallback(() => {
    setShowCategory((prev) => !prev)
  }, [])

  // Hide category when query params change
  useEffect(() => {
    setShowCategory(false)
  }, [location.search])

  // Hide category when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategory(false)
      }
    }

    if (showCategory) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showCategory])

  return (
    <PlaylistHeaderWrapper>
      <HeaderLeft>
        <span className="title">{category}</span>
        <div ref={categoryRef}>
          <button className="select sprite_button" onClick={switchCategory}>
            <span className="sprite_button">
              选择分类
              <i className="sprite_icon2" />
            </span>
          </button>
          {showCategory && <PlaylistCategory category={category} />}
        </div>
      </HeaderLeft>
      <HeaderRight>
        <button className="hot sprite_button2">热门</button>
      </HeaderRight>
    </PlaylistHeaderWrapper>
  )
}

export default memo(PlaylistHeader)
