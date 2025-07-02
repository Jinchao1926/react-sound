import { FC, memo, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'

import RadioRanking from './RadioRanking'
import RadioRecommend from './RadioRecommend'
import { DJRadioCategoryWrapper } from './style'
import CategoryHeader from '../../components/CategoryHeader'
import {
  changeHotTotalAction,
  fetchHotRadiosAsync,
  fetchRadioCategoriesAsync,
  fetchRecommendedRadiosAsync,
} from '../../store'

const RadioCategory: FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryId = queryParams.get('id')

  const dispatch = useAppDispatch()
  useEffect(() => {
    const id = Number(categoryId)
    dispatch(fetchRadioCategoriesAsync())
    dispatch(changeHotTotalAction(0))
    dispatch(fetchRecommendedRadiosAsync(id))
    dispatch(fetchHotRadiosAsync({ categoryId: id, page: 0 }))
  }, [dispatch, categoryId])

  return (
    <DJRadioCategoryWrapper>
      <CategoryHeader id={Number(categoryId)} />
      <RadioRecommend />
      <RadioRanking categoryId={Number(categoryId)} />
    </DJRadioCategoryWrapper>
  )
}

export default memo(RadioCategory)
