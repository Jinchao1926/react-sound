import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { fetchRadioCategorysAsync } from '../../store'

import { DJRadioCategoryWrapper } from './style'
import RadioCategory from '../../radio-category-header'
import RadioRecommend from './radio-recommend'
import RadioRanking from './radio-ranking'

interface IProps {
  children?: ReactNode
}

const DJRadioCategory: FC<IProps> = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryId = queryParams.get('id')
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRadioCategorysAsync())
  }, [dispatch])

  return (
    <DJRadioCategoryWrapper>
      <RadioCategory id={Number(categoryId)}/>
      <RadioRecommend />
      <RadioRanking />
    </DJRadioCategoryWrapper>
  )
}

export default memo(DJRadioCategory)