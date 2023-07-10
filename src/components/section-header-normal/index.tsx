import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom';
import { SectionHeaderNormalWrapper } from './style'

interface IProps {
  children?: ReactNode;
  title: string;
  subTitle?: string;
  keywords?: string[];
  onKeywordClick?: (keyword: string) => void;
  morePath?: string;
}

const SectionHeaderNormal: FC<IProps> = (props: IProps) => {
  const { title, subTitle, keywords, onKeywordClick, morePath } = props
  const showMorePath = (morePath !== null && morePath !== undefined)

  const handleKeywordClick = (keyword: string) => {
    if (onKeywordClick) {
      onKeywordClick(keyword)
    }
  }
  
  return (
    <SectionHeaderNormalWrapper>
      <div className='left'>
        <span className='title'>{title}</span>
        { subTitle && <span className='sub-title'>{subTitle}</span> }
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
      </div>
      { showMorePath && <NavLink className='right' to={morePath}>更多 &gt;</NavLink>}
    </SectionHeaderNormalWrapper>
  )
}

export default memo(SectionHeaderNormal)