import { type FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { DJRadioCategoryWrapper } from './RadioCategory.styles'
import { RadioRanking } from './RadioRanking/RadioRanking'
import { RadioRecommend } from './RadioRecommend/RadioRecommend'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'

export const RadioCategory: FC = () => {
  const { id: categoryId } = useQueryParamId()

  return (
    <DJRadioCategoryWrapper>
      <RadioCategoryHeader id={categoryId} />
      {categoryId && <RadioRecommend id={categoryId} />}
      {categoryId && <RadioRanking id={categoryId} />}
    </DJRadioCategoryWrapper>
  )
}
