import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { SectionHeaderRCMWrapper } from './style'

interface IProps {
  children?: ReactNode
  title: string
  keywords?: string[]
  morePath: string
}

const SectionHeaderRCM: FC<IProps> = (props: IProps) => {
  const { title, keywords, morePath } = props

  return (
    <SectionHeaderRCMWrapper className='sprite_02'>
      <div className='left'>
        <NavLink className='title' to='/discover/playlist'>{title}</NavLink>
        <div className='keyword-list'>
          {
            keywords?.map(item => {
              return (
                <div className='item' key={item}>
                  <span className='keyword'>{item}</span>
                  <span className='divider'>|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='right'>
        <NavLink to={morePath}>更多</NavLink>
        <i className='icon sprite_02' />
      </div>
    </SectionHeaderRCMWrapper>
  )
}

export default memo(SectionHeaderRCM)