import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { RadioRankingWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode
}

const RadioRanking: FC<IProps> = () => {
  return (
    <RadioRankingWrapper>
      <SectionHeaderNormal title='电台排行榜' />
    </RadioRankingWrapper>
  )
}

export default memo(RadioRanking)