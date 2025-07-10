import React, { FC, memo } from 'react'

import { RadioWrapper } from './Radio.styles'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { TopRadioCategory } from '../../components/TopRadioCategory'
import { ProgramRanking } from '../ProgramRanking'
import { ProgramRecommend } from '../ProgramRecommend'

const Radio: FC = () => {
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

export default memo(Radio)
