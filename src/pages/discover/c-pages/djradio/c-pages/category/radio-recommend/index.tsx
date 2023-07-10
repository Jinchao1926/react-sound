import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { RadioRecommendWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode
}

const RadioRecommend: FC<IProps> = () => {
  return (
    <RadioRecommendWrapper>
      <SectionHeaderNormal title='优秀新电台' />
    </RadioRecommendWrapper>
  )
}

export default memo(RadioRecommend)