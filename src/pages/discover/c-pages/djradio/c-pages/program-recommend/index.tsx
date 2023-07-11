import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchRecommendProgramsAsync } from '../../store';

import { formatSizedImage } from '@/utils/format-utils';

import { ProgramRecommendWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode;
  simpleVersion?: boolean;
}

const ProgramRecommend: FC<IProps> = (props: IProps) => {
  const { simpleVersion = false } = props
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const [morePath, setMorePath] = useState<string | undefined>()

  // redux
  const programs = useAppSelector(
    state => state.radio.recommendPrograms,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendProgramsAsync())
  }, [dispatch])

  // Custom Header
  useEffect(() => {
    setSubTitle(simpleVersion ? undefined : '（每日更新）')
    setMorePath(simpleVersion ? '/discover/djradio/recommend' : undefined)
  }, [simpleVersion])

  return (
    <ProgramRecommendWrapper className='program-recommend'>
      <SectionHeaderNormal 
        title='推荐节目' 
        subTitle={subTitle}
        morePath={morePath} 
      />
      <div className='program-list'>
        {
          programs.map(item => {
            return (
              <div className='program-item' key={item.id}>
                <a className='cover' href='/#'>
                  <img src={formatSizedImage(item.coverUrl, 40)} alt='' />
                  <button className='play sprite_icon' title='播放' />
                </a>
                { 
                  simpleVersion ? (
                    <div className='content'>
                      <NavLink className='item name no-wrap' to={`/program?id=${item.radio.lastProgramId}`}>
                        {item.name}
                      </NavLink>
                      <NavLink className='item brand no-wrap' to={`/radio?id=${item.radio.id}`}>
                        {item.dj.brand}
                      </NavLink>
                    </div>
                  ) : (
                    <>
                    <NavLink className='item name no-wrap' to={`/program?id=${item.radio.lastProgramId}`}>
                      {item.name}
                    </NavLink>
                    <NavLink className='item brand no-wrap' to={`/radio?id=${item.radio.id}`}>
                      {item.dj.brand}
                    </NavLink>
                    <span className='item play-count'>播放{item.listenerCount}</span>
                    <span className='item thumbs-up'>赞{item.likedCount || 0}</span>
                    </>
                  )
                }
                <NavLink className='category' to={`/discover/djradio/category?id=${item.radio.categoryId}`}>
                  {item.radio.category}
                </NavLink>
              </div>
            )
          })
        }
      </div>
    </ProgramRecommendWrapper>
  )
}

export default memo(ProgramRecommend)