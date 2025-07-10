import React, { FC, useMemo } from 'react'

import { Tooltip } from 'antd'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import RadioPlayCover from '@/components/RadioPlayCover'
import RankingTrend from '@/components/RankingTrend'
import { SectionHeader } from '@/components/SectionHeader'
import { useTopProgramsQuery } from '@/hooks/program/useTopProgramsQuery'
import { padLeft, formatMonthDay } from '@/utils/format-utils'

import {
  ProgramRankingWrapper,
  RankingHotWrapper,
} from './ProgramRanking.styles'

export const ProgramRanking: FC<{ isCompact?: boolean }> = ({
  isCompact = false,
}) => {
  const { data, updateTime } = useTopProgramsQuery()
  const { subTitle, morePath, programs } = useMemo(
    () => ({
      subTitle: isCompact
        ? undefined
        : `最近更新：${formatMonthDay(updateTime)}`,
      morePath: isCompact ? '/discover/djradio/rank' : undefined,
      programs: isCompact ? data.slice(0, 10) : data,
    }),
    [isCompact, data, updateTime]
  )

  const renderProgramContent = (item: any, index: number) => {
    const nameLink = (
      <NavLink
        className="item name no-wrap"
        to={`/program?id=${item.program.radio.lastProgramId}`}
      >
        {item.program.name}
      </NavLink>
    )

    const brandLink = (
      <NavLink
        className="item brand no-wrap"
        to={`/radio?id=${item.program.radio.id}`}
      >
        {item.program.dj.brand}
      </NavLink>
    )

    if (isCompact) {
      return (
        <div className="content">
          {nameLink}
          {brandLink}
        </div>
      )
    }

    return (
      <>
        {nameLink}
        {brandLink}
        <div className="category">
          <NavLink
            to={`/discover/djradio/category?id=${item.program.radio.categoryId}`}
          >
            {item.program.radio.category}
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <ProgramRankingWrapper className="program-ranking">
      <SectionHeader
        title="节目排行榜"
        subtitle={subTitle}
        moreHref={morePath}
      />
      {!isCompact && (
        <Tooltip
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          color="#fff"
          title="选取云音乐中7天内发布的热度最高的节目，每天更新。热度由节目播放、赞、分享数量总和计算。"
        >
          <div className="tips sprite_icon3" />
        </Tooltip>
      )}
      <div className="ranking-list">
        {programs.map((item, index) => (
          <div className="ranking-item" key={item.program.id}>
            <div className="rank">
              <span className={classNames('index', { red: index < 3 })}>
                {padLeft(index + 1)}
              </span>
              <RankingTrend rank={item.rank} lastRank={item.lastRank} />
            </div>
            <RadioPlayCover coverUrl={item.program.coverUrl} />
            {renderProgramContent(item, index)}
            <RankingHotWrapper
              className="sprite_table"
              marginLeft={isCompact ? 0 : 28}
            >
              <i
                className="sprite_table"
                style={{ width: `${item.score / 600}%` }}
              />
            </RankingHotWrapper>
          </div>
        ))}
      </div>
    </ProgramRankingWrapper>
  )
}
