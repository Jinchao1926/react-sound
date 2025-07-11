import React, { FC } from 'react'

import { RadioWrapper } from './Radio.styles'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { TopRadioCategory } from '../../components/TopRadioCategory'
import { ProgramRanking } from '../ProgramRanking'
import { ProgramRecommend } from '../ProgramRecommend'

export const Radio: FC = () => {
  return (
    <RadioWrapper>
      <RadioCategoryHeader />
      <div className="programs">
        <ProgramRecommend isCompact={true} />
        <ProgramRanking isCompact={true} />
      </div>
      <TopRadioCategory />
    </RadioWrapper>
  )
}
