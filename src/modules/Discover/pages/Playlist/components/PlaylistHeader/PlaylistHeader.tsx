import React, { FC, useCallback, useState, useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'

import { Box, Flex, Text } from '@/components/UI'

import {
  PlaylistHeaderWrapper,
  ArrowDown,
  CategoryButton,
  CategoryButtonText,
  HotButton,
} from './PlaylistHeader.styles'
import { PlaylistCategory } from '../PlaylistCategory'

export const PlaylistHeader: FC<{ category: string }> = ({ category }) => {
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
      <Flex position="relative">
        <Text fontSize={24} lineHeight={34}>
          {category}
        </Text>
        <div ref={categoryRef}>
          <CategoryButton onClick={switchCategory}>
            <CategoryButtonText>
              选择分类
              <ArrowDown />
            </CategoryButtonText>
          </CategoryButton>
          {showCategory && <PlaylistCategory category={category} />}
        </div>
      </Flex>
      <Box>
        <HotButton>热门</HotButton>
      </Box>
    </PlaylistHeaderWrapper>
  )
}
