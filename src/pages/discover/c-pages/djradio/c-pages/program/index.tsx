import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { 
  fetchRadioCategoriesAsync,
  fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync,
  fetchRecommendedRadioCategoriesAsync
 } from '../../store'

import { RadioProgramWrapper } from './style'
import RadioCategoryHeader from '../../radio-category-header'
import ProgramRecommend from '../program-recommend'
import ProgramRanking from '../program-ranking'
import RadioMore from './radio-more'

interface IProps {
  children?: ReactNode;
}

const RadioProgram: FC<IProps> = () => {
  const categories = useAppSelector(state => state.radio.recommendCategories, shallowEqual)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRadioCategoriesAsync())
    dispatch(fetchRecommendProgramsAsync(true))
    dispatch(fetchRankedProgramsAsync(true))
    dispatch(fetchRecommendedRadioCategoriesAsync())
  }, [dispatch])

  return (
    <RadioProgramWrapper>
      <RadioCategoryHeader />
      <div className='programs'>
        <ProgramRecommend simpleVersion={true} />
        <ProgramRanking simpleVersion={true} />
      </div>
      {
        categories.map(item => 
          <RadioMore key={item.length > 0 && item[0].id} items={item} />
        )
      }
    </RadioProgramWrapper>
  )
}

export default memo(RadioProgram)