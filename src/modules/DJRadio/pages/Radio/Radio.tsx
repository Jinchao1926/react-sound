import React, { FC, memo, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import { RadioWrapper } from './Radio.styles'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { TopRadioCategory } from '../../components/TopRadioCategory'
import {
  // fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync,
} from '../../store'
import ProgramRanking from '../ProgramRanking'
import { ProgramRecommend } from '../ProgramRecommend/ProgramRecommend'

const Radio: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(fetchRecommendProgramsAsync(true))
    dispatch(fetchRankedProgramsAsync(true))
  }, [dispatch])

  return (
    <RadioWrapper>
      <RadioCategoryHeader />
      <div className="programs">
        <ProgramRecommend isCompact={true} />
        <ProgramRanking simpleVersion={true} />
      </div>
      <TopRadioCategory />
    </RadioWrapper>
  )
}

export default memo(Radio)
