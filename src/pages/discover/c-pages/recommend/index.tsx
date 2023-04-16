import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { 
  RecommendWrapper 
} from './style'

import Banner from './c-components/Banner'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  return (
    <RecommendWrapper>
      <Banner />
      <div>Recommend</div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)