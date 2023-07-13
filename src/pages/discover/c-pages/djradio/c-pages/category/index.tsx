import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { 
  fetchRadioCategorysAsync, 
  fetchRecommendedRadiosAsync,
  fetchHotRadiosAsync,
  changeHotTotalAction,
} from '../../store'

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
    const id = Number(categoryId)
    dispatch(fetchRadioCategorysAsync())
    dispatch(changeHotTotalAction(0))
    dispatch(fetchRecommendedRadiosAsync(id))
    dispatch(fetchHotRadiosAsync({categoryId: id, page: 0}))
  }, [dispatch, categoryId])

  return (
    <DJRadioCategoryWrapper>
      <RadioCategory id={Number(categoryId)}/>
      <RadioRecommend />
      <RadioRanking categoryId={Number(categoryId)}/>
    </DJRadioCategoryWrapper>
  )
}

export default memo(DJRadioCategory)