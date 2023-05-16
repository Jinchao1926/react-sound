import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { formatSizedImage } from '@/utils/format-utils'

import { HotAnchorWrapper } from './style'
import SectionHeaderV2Wrapper from '@/components/section-header-v2'
import { hotRadios } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <SectionHeaderV2Wrapper title='热门主播'/>
      <div className='anchor-list'>
      {
        hotRadios.map(item => {
          return (
            <a className='anchor' key={item.picUrl} href={item.url}>
              <img className='avatar' src={formatSizedImage(item.picUrl, 40)} alt=''/>
              <div className='info'>
                <span className='name'>{item.name}</span>
                <span className='desc'>{item.position}</span>
              </div>
            </a>
          )
        })
      }
      </div>
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)