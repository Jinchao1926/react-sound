import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { RankListWrapper } from './style'
import SectionHeaderRCM from '@/components/section-header-rcm'

interface IProps {
  children?: ReactNode
}

const RankList: FC<IProps> = () => {
  return (
    <RankListWrapper>
      <SectionHeaderRCM title='榜单' morePath='/discover/ranking'/>
    </RankListWrapper>
  )
}

export default memo(RankList)