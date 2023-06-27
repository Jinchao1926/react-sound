import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { formatSizedImage } from '@/utils/format-utils'

import { HotAnchorWrapper } from './style'
import SectionHeaderMore from '@/components/section-header-more'
import { hotRadios } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <div className='header'>
        <SectionHeaderMore title='热门主播'/>
      </div>
      <div className='anchor-list'>
      {
        hotRadios.map(item => {
          return (
            <NavLink className='anchor' key={item.picUrl} to={item.url}>
              <img className='avatar' src={formatSizedImage(item.picUrl, 40)} alt=''/>
              <div className='info'>
                <span className='name'>{item.name}</span>
                <span className='desc no-wrap'>{item.position}</span>
              </div>
            </NavLink>
          )
        })
      }
      </div>
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)