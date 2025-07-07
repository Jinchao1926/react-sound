import React, { FC, memo, useEffect } from 'react'

import { shallowEqual } from 'react-redux'

import { useAppDispatch, useAppSelector } from '@/store'

import { RadioProgramWrapper } from './Podcast.styles'
import RadioMore from './RadioMore'
import { PodcastCategoryHeader } from '../../components/PodcastCategoryHeader'
import {
  fetchRadioCategoriesAsync,
  fetchRecommendProgramsAsync,
  fetchRankedProgramsAsync,
  fetchRecommendedRadioCategoriesAsync,
} from '../../store'
import ProgramRanking from '../ProgramRanking'
import ProgramRecommend from '../ProgramRecommend'

const Podcast: FC = () => {
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
      <PodcastCategoryHeader />
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

export default memo(Podcast)
