import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import RadioPlayCover from '@/components/RadioPlayCover'
import SectionHeaderNormal from '@/components/SectionHeaderNormal'
import { useAppSelector, useAppDispatch } from '@/store'

import { ProgramRecommendWrapper } from './style'
import { fetchRecommendProgramsAsync } from '../../store'

interface IProps {
  children?: ReactNode
  simpleVersion?: boolean
}

const ProgramRecommend: FC<IProps> = (props: IProps) => {
  const { simpleVersion = false } = props
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const [morePath, setMorePath] = useState<string | undefined>()
  const [datas, setDatas] = useState<any[]>([])

  // redux
  const programs = useAppSelector(
    (state) => state.radio.recommendPrograms,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendProgramsAsync(simpleVersion))
  }, [dispatch, simpleVersion])

  // Custom Header
  useEffect(() => {
    setSubTitle(simpleVersion ? undefined : '（每日更新）')
    setMorePath(simpleVersion ? '/discover/djradio/recommend' : undefined)
    setDatas(simpleVersion ? programs.slice(0, 10) : programs)
  }, [simpleVersion, programs])

  return (
    <ProgramRecommendWrapper className="program-recommend">
      <SectionHeaderNormal
        title="推荐节目"
        subTitle={subTitle}
        morePath={morePath}
      />
      <div className="program-list">
        {datas.map((item) => {
          return (
            <div className="program-item" key={item.id}>
              <RadioPlayCover coverUrl={item.coverUrl} />
              {simpleVersion ? (
                <div className="content">
                  <NavLink
                    className="item name no-wrap"
                    to={`/program?id=${item.radio.lastProgramId}`}
                  >
                    {item.name}
                  </NavLink>
                  <NavLink
                    className="item brand no-wrap"
                    to={`/radio?id=${item.radio.id}`}
                  >
                    {item.dj.brand}
                  </NavLink>
                </div>
              ) : (
                <>
                  <NavLink
                    className="item name no-wrap"
                    to={`/program?id=${item.radio.lastProgramId}`}
                  >
                    {item.name}
                  </NavLink>
                  <NavLink
                    className="item brand no-wrap"
                    to={`/radio?id=${item.radio.id}`}
                  >
                    {item.dj.brand}
                  </NavLink>
                  <span className="item play-count">
                    播放{item.listenerCount}
                  </span>
                  <span className="item thumbs-up">
                    赞{item.likedCount || 0}
                  </span>
                </>
              )}
              <NavLink
                className="category"
                to={`/discover/djradio/category?id=${item.radio.categoryId}`}
              >
                {item.radio.category}
              </NavLink>
            </div>
          )
        })}
      </div>
    </ProgramRecommendWrapper>
  )
}

export default memo(ProgramRecommend)
