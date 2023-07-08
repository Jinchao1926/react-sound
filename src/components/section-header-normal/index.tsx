import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeaderNormalWrapper } from './style'

interface IProps {
  children?: ReactNode;
  title: string;
  keywords?: string[];
  onKeywordClick?: (keyword: string) => void;
}

const SectionHeaderNormal: FC<IProps> = (props: IProps) => {
  const { title, keywords, onKeywordClick } = props
  const handleKeywordClick = (keyword: string) => {
    if (onKeywordClick) {
      onKeywordClick(keyword)
    }
  }
  
  return (
    <SectionHeaderNormalWrapper>
      <span className='title'>{title}</span>
      <div className='keyword-list'>
        {
          keywords?.map(item => {
            return (
              <div className='item' key={item}>
                <span className='keyword' onClick={e => handleKeywordClick(item)}>{item}</span>
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