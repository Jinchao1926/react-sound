import React, { FC, useMemo } from 'react'

import { Tooltip } from 'antd'

import { SectionHeader } from '@/components/SectionHeader'
import { Box, TextNavLink } from '@/components/UI'
import { useTopProgramsQuery } from '@/hooks/program/useTopProgramsQuery'
import { ProgramCover } from '@/modules/DJRadio/components/ProgramCover'
import { RankingTrend } from '@/modules/DJRadio/components/RankingTrend'
import { Program } from '@/types/program'
import { padLeft, formatMonthDay } from '@/utils/timeFormat'

import {
  InfoIcon,
  ProgramRankingWrapper,
  Ranking,
  RankingIndex,
  RankingProgress,
} from './ProgramRanking.styles'
import { CategoryLink, ProgramItem, ProgramList } from '../../components/shared'

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
    const programPath = `/program?id=${program.id}`
    const radioPath = `/djradio?id=${program.radio.id}`

    const programLink = (
      <TextNavLink
        nowrap
        ml={isCompact ? 0 : 10}
        width={isCompact ? '100%' : 304}
        lineHeight={isCompact ? 20 : undefined}
        color="#333"
        to={programPath}
      >
        {program.name}
      </TextNavLink>
    )

    const radioLink = (
      <TextNavLink
        nowrap
        ml={isCompact ? 0 : 10}
        width={isCompact ? '100%' : 176}
        lineHeight={isCompact ? 20 : undefined}
        to={radioPath}
      >
        {program.radio.name}
      </TextNavLink>
    )

    if (isCompact) {
      return (
        <Box width={208} ml={10} mt={1}>
          {programLink}
          {radioLink}
        </Box>
      )
    }

    return (
      <>
        {programLink}
        {radioLink}
        <Box width={140} ml={10} mt={1}>
          <CategoryLink
            to={`/discover/djradio/category?id=${program.radio.categoryId}`}
          >
            {program.radio.category}
          </CategoryLink>
        </Box>
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
          <InfoIcon />
        </Tooltip>
      )}

      <ProgramList>
        {programs.map((item, index) => (
          <ProgramItem key={item.program.id}>
            <Box width={47} mt={6}>
              <RankingIndex highlight={index < 3}>
                {padLeft(index + 1)}
              </RankingIndex>
              <RankingTrend rank={item.rank} lastRank={item.lastRank} />
            </Box>
            <ProgramCover coverUrl={item.program.coverUrl} />

            {renderProgramContent(item.program)}

            <Ranking marginLeft={isCompact ? 0 : 28}>
              <RankingProgress
                widthPercent={(item.score / programs[0].score) * 100}
              />
            </Ranking>
          </ProgramItem>
        ))}
      </ProgramList>
    </ProgramRankingWrapper>
  )
}
