import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchRankedProgramsAsync } from '../../store';

import classNames from 'classnames';
import { padLeft, formatMonthDay } from '@/utils/format-utils';

import { Tooltip } from 'antd';
import { ProgramRankingWrapper, RankingHotWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'
import RadioPlayCover from '@/components/radio-play-cover';
import RankingTrend from '@/components/ranking-trend';

interface IProps {
  children?: ReactNode;
  simpleVersion?: boolean;
}

const ProgramRanking: FC<IProps> = (props: IProps) => {
  const { simpleVersion = false } = props
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const [morePath, setMorePath] = useState<string | undefined>()
  const [datas, setDatas] = useState<any[]>([])

  // redux
  const program = useAppSelector(
    state => state.radio.rankedProgram,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRankedProgramsAsync(simpleVersion))
  }, [dispatch, simpleVersion])

  // Custom Header
  useEffect(() => {
    const updateTime = formatMonthDay(program.updateTime)
    setSubTitle(simpleVersion ? undefined : `最近更新：${updateTime}`)
    setMorePath(simpleVersion ? '/discover/djradio/ranking' : undefined)
    setDatas(simpleVersion ? program.toplist.slice(0, 10) : program.toplist)
  }, [simpleVersion, program])

  return (
    <ProgramRankingWrapper className='program-ranking'>
      <SectionHeaderNormal 
        title='节目排行榜' 
        subTitle={subTitle}
        morePath={morePath}
      />
      { 
        !simpleVersion && (
          <Tooltip placement='bottomRight'
            arrow={{pointAtCenter: true}}
            color='#fff'
            title='选取云音乐中7天内发布的热度最高的节目，每天更新。热度由节目播放、赞、分享数量总和计算。'>
            <div className='tips sprite_icon3'/>
          </Tooltip>
        )
      }
      <div className='ranking-list'>
      {
        datas.map(({program, rank, lastRank, score}, index) => {
          return (
            <div className='ranking-item' key={program.id}>
              <div className='rank'>
                <span className={classNames('index', {red: index < 3})}>{padLeft(index + 1)}</span>
                <RankingTrend rank={rank} lastRank={lastRank}/>
              </div>
              <RadioPlayCover coverUrl={program.coverUrl}/>
              {
                simpleVersion ? (
                  <div className='content'>
                    <NavLink className='item name no-wrap' to={`/program?id=${program.radio.lastProgramId}`}>
                      {program.name}
                    </NavLink>
                    <NavLink className='item brand no-wrap' to={`/radio?id=${program.radio.id}`}>
                      {program.dj.brand}
                    </NavLink>
                  </div>
                ) : (
                  <>
                  <NavLink className='item name no-wrap' to={`/program?id=${program.radio.lastProgramId}`}>
                    {program.name}
                  </NavLink>
                  <NavLink className='item brand no-wrap' to={`/radio?id=${program.radio.id}`}>
                    {program.dj.brand}
                  </NavLink>
                  <div className='category'>
                    <NavLink to={`/discover/djradio/category?id=${program.radio.categoryId}`}>
                      {program.radio.category}
                    </NavLink>
                  </div>
                  </>
                )
              }
              <RankingHotWrapper className='sprite_table' marginLeft={simpleVersion ? 0 : 28}>
                <i className='sprite_table' style={{width: `${score / 600}%`}} />
              </RankingHotWrapper>
            </div>
          )
        })
      }
      </div>
    </ProgramRankingWrapper>
  )
}

export default memo(ProgramRanking)