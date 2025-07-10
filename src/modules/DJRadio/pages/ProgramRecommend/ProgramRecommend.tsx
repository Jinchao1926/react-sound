import React, { FC, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import RadioPlayCover from '@/components/RadioPlayCover'
import { SectionHeader } from '@/components/SectionHeader'
import { useRecommendedProgramsQuery } from '@/hooks/program/useRecommendedProgramsQuery'
import { Program } from '@/types/program'

import { ProgramRecommendWrapper } from './ProgramRecommend.styles'

export const ProgramRecommend: FC<{ isCompact?: boolean }> = ({
  isCompact = false,
}) => {
  const { data } = useRecommendedProgramsQuery()
  const { subTitle, morePath, programs } = useMemo(
    () => ({
      subTitle: isCompact ? undefined : '（每日更新）',
      morePath: isCompact ? '/discover/djradio/recommend' : undefined,
      programs: isCompact ? data.slice(0, 10) : data,
    }),
    [isCompact, data]
  )

  const renderProgramContent = (item: Program) => {
    const nameLink = (
      <NavLink className="item name no-wrap" to={`/program?id=${item.id}`}>
        {item.name}
      </NavLink>
    )

    const radioLink = (
      <NavLink
        className="item brand no-wrap"
        to={`/djradio?id=${item.radio.id}`}
      >
        {item.radio.name}
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
        <span className="item play-count">播放{item.listenerCount}</span>
        <span className="item thumbs-up">赞{item.likedCount || 0}</span>
      </>
    )
  }

  return (
    <ProgramRecommendWrapper className="program-recommend">
      <SectionHeader title="推荐节目" subtitle={subTitle} moreHref={morePath} />
      <div className="program-list">
        {programs.map((item) => (
          <div className="program-item" key={item.id}>
            <RadioPlayCover coverUrl={item.coverUrl} />
            {renderProgramContent(item)}
            <NavLink
              className="category"
              to={`/discover/djradio/category?id=${item.radio.categoryId}`}
            >
              {item.radio.category}
            </NavLink>
          </div>
        ))}
      </div>
    </ProgramRecommendWrapper>
  )
}
