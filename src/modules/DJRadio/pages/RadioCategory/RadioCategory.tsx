import { FC } from 'react'

import { DJRadioCategoryWrapper } from './RadioCategory.styles'
import { RadioRanking } from './RadioRanking/RadioRanking'
import { RadioRecommend } from './RadioRecommend/RadioRecommend'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { useSelectedRadioCategory } from '../../hooks/useSelectedRadioCategory'

export const RadioCategory: FC = () => {
  const { categoryId } = useSelectedRadioCategory()

  return (
    <DJRadioCategoryWrapper>
      <RadioCategoryHeader id={categoryId} />
      {categoryId && <RadioRecommend id={categoryId} />}
      {categoryId && <RadioRanking id={categoryId} />}
    </DJRadioCategoryWrapper>
  )
}
