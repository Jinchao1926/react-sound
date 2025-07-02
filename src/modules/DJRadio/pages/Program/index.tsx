import React, { FC, memo, useEffect } from 'react'

import { shallowEqual } from 'react-redux'

import { useAppDispatch, useAppSelector } from '@/store'

import RadioMore from './RadioMore'
import { RadioProgramWrapper } from './style'
import CategoryHeader from '../../components/CategoryHeader'
import {
  fetchRadioCategoriesAsync,
  fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync,
  fetchRecommendedRadioCategoriesAsync,
} from '../../store'
import ProgramRanking from '../ProgramRanking'
import ProgramRecommend from '../ProgramRecommend'

const Program: FC = () => {
  const categories = useAppSelector(
    (state) => state.radio.recommendCategories,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRadioCategoriesAsync())
    dispatch(fetchRecommendProgramsAsync(true))
    dispatch(fetchRankedProgramsAsync(true))
    dispatch(fetchRecommendedRadioCategoriesAsync())
  }, [dispatch])

  return (
    <RadioProgramWrapper>
      <CategoryHeader />
      <div className="programs">
        <ProgramRecommend simpleVersion={true} />
        <ProgramRanking simpleVersion={true} />
      </div>
      {categories.map((item) => (
        <RadioMore key={item.length > 0 && item[0].id} items={item} />
      ))}
    </RadioProgramWrapper>
  )
}

export default memo(Program)
