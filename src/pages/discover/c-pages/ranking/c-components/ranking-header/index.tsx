import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { formatSizedImage } from '@/utils/format-utils'

import { RankingInfoWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const RankingHeader: FC<IProps> = () => {
  return (
    <RankingInfoWrapper>
      <div className='cover'>
          <img src={formatSizedImage("", 150)} alt={""}/>
          <span className='sprite_cover' />
        </div>
    </RankingInfoWrapper>
  )
}

export default memo(RankingHeader)