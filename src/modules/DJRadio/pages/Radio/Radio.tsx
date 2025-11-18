import React, { FC } from 'react'

import { Box } from '@/components/UI'

import { RadioPrograms } from './Radio.styles'
import { RadioCategoryHeader } from '../../components/RadioCategoryHeader'
import { TopRadioCategory } from '../../components/TopRadioCategory'
import { ProgramRanking } from '../ProgramRanking'
import { ProgramRecommend } from '../ProgramRecommend'

export const Radio: FC = () => {
  return (
    <Box>
      <RadioCategoryHeader />
      <RadioPrograms>
        <ProgramRecommend isCompact={true} />
        <ProgramRanking isCompact={true} />
      </RadioPrograms>
      <TopRadioCategory />
    </Box>
  )
}
