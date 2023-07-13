import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { 
  fetchRadioCategorysAsync,
  fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync
 } from '../../store'

import { RadioProgramWrapper } from './style'
import RadioCategoryHeader from '../../radio-category-header'
import ProgramRecommend from '../program-recommend'
import ProgramRanking from '../program-ranking'

interface IProps {
  children?: ReactNode;
}

const RadioProgram: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRadioCategorysAsync())
    dispatch(fetchRecommendProgramsAsync(true))
    dispatch(fetchRankedProgramsAsync(true))
  }, [dispatch])

  return (
    <RadioProgramWrapper>
      <RadioCategoryHeader />
      <div className='programs'>
        <ProgramRecommend simpleVersion={true} />
        <ProgramRanking simpleVersion={true} />
      </div>
    </RadioProgramWrapper>
  )
}

export default memo(RadioProgram)