import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeaderNormalWrapper } from './style'

interface IProps {
  children?: ReactNode,
  title: string,
  keywords?: string[]
}

const SectionHeaderNormal: FC<IProps> = (props: IProps) => {
  const { title, keywords } = props
  return (
    <SectionHeaderNormalWrapper>
      <span className='title'>{title}</span>
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
    </SectionHeaderNormalWrapper>
  )
}

export default memo(SectionHeaderNormal)