import React, { FC, useMemo } from 'react'

import { Tooltip } from 'antd'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { useTopProgramsQuery } from '@/hooks/program/useTopProgramsQuery'
import { ProgramCover } from '@/modules/DJRadio/components/ProgramCover'
import { RankingTrend } from '@/modules/DJRadio/components/RankingTrend'
import { Program } from '@/types/program'
import { padLeft, formatMonthDay } from '@/utils/timeFormat'

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

  const renderProgramContent = (program: Program) => {
    const nameLink = (
      <NavLink className="item name no-wrap" to={`/program?id=${program.id}`}>
        {program.name}
      </NavLink>
    )

    const radioLink = (
      <NavLink
        className="item brand no-wrap"
        to={`/djradio?id=${program.radio.id}`}
      >
        {program.radio.name}
      </NavLink>
    )

    if (isCompact) {
      return (
        <div className="content">
          {nameLink}
          {radioLink}
        </div>
      )
    }

    return (
      <>
        {nameLink}
        {radioLink}
        <div className="category">
          <NavLink
            to={`/discover/djradio/category?id=${program.radio.categoryId}`}
          >
            {program.radio.category}
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
            <ProgramCover coverUrl={item.program.coverUrl} />
            {renderProgramContent(item.program)}
            <RankingHotWrapper
              className="sprite_table"
              marginLeft={isCompact ? 0 : 28}
            >
              <i
                className="sprite_table progress"
                style={{
                  width: `${(item.score / programs[0].score) * 96}%`,
                }}
              >
                <i className="sprite_table right-corner" />
              </i>
            </RankingHotWrapper>
          </div>
        ))}
      </div>
    </ProgramRankingWrapper>
  )
}
