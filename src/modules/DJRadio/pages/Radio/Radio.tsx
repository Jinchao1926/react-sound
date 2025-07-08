import React, { FC, memo, useEffect } from 'react'

import { shallowEqual } from 'react-redux'

import { useAppDispatch, useAppSelector } from '@/store'

import { RadioWrapper } from './Radio.styles'
import RadioMore from './RadioMore'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import {
  fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync,
  fetchRecommendedRadioCategoriesAsync,
} from '../../store'
import ProgramRanking from '../ProgramRanking'
import ProgramRecommend from '../ProgramRecommend'

const Radio: FC = () => {
  const categories = useAppSelector(
    (state) => state.radio.recommendCategories,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendProgramsAsync(true))
    dispatch(fetchRankedProgramsAsync(true))
    dispatch(fetchRecommendedRadioCategoriesAsync())
  }, [dispatch])

  return (
    <RadioWrapper>
      <RadioCategoryHeader />
      <div className="programs">
        <ProgramRecommend simpleVersion={true} />
        <ProgramRanking simpleVersion={true} />
      </div>
      {categories.map((item) => (
        <RadioMore key={item.length > 0 && item[0].id} items={item} />
      ))}
    </RadioWrapper>
  )
}

export default memo(Radio)
