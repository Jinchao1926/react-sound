import { FC, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import { DJRadioCategoryWrapper } from './RadioCategory.styles'
import RadioRanking from './RadioRanking'
import { RadioRecommend } from './RadioRecommend/RadioRecommend'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { useSelectedRadioCategory } from '../../hooks/useSelectedRadioCategory'
import { changeHotTotalAction, fetchHotRadiosAsync } from '../../store'

export const RadioCategory: FC = () => {
  const { categoryId } = useSelectedRadioCategory()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeHotTotalAction(0))
    if (categoryId) {
      dispatch(fetchHotRadiosAsync({ categoryId: categoryId, page: 0 }))
    }
  }, [dispatch, categoryId])

  return (
    <DJRadioCategoryWrapper>
      <RadioCategoryHeader id={categoryId} />
      {categoryId && <RadioRecommend id={categoryId} />}
      {categoryId && <RadioRanking categoryId={categoryId} />}
    </DJRadioCategoryWrapper>
  )
}
