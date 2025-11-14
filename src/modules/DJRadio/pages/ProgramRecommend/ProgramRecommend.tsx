import React, { FC, useMemo } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box, Text, TextNavLink } from '@/components/UI'
import { useRecommendedProgramsQuery } from '@/hooks/program/useRecommendedProgramsQuery'
import { ProgramCover } from '@/modules/DJRadio/components/ProgramCover'
import { Program } from '@/types/program'

import { ProgramRecommendWrapper } from './ProgramRecommend.styles'
import { CategoryLink, ProgramItem, ProgramList } from '../../components/shared'

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
        width={isCompact ? '100%' : 166}
        lineHeight={isCompact ? 20 : undefined}
        to={radioPath}
      >
        {program.radio.name}
      </TextNavLink>
    )

    if (isCompact) {
      return (
        <Box width={254} ml={10} mt={1}>
          {programLink}
          {radioLink}
        </Box>
      )
    }

    return (
      <>
        {programLink}
        {radioLink}
        <Text color="#999" width={90} ml={10}>
          播放{program.listenerCount}
        </Text>
        <Text color="#999" width={126} ml={10}>
          赞{program.likedCount || 0}
        </Text>
      </>
    )
  }

  return (
    <ProgramRecommendWrapper className="program-recommend">
      <SectionHeader title="推荐节目" subtitle={subTitle} moreHref={morePath} />
      <ProgramList>
        {programs.map((item) => (
          <ProgramItem key={item.id} pl={20}>
            <ProgramCover coverUrl={item.coverUrl} />

            {renderProgramContent(item)}

            <CategoryLink
              to={`/discover/djradio/category?id=${item.radio.categoryId}`}
            >
              {item.radio.category}
            </CategoryLink>
          </ProgramItem>
        ))}
      </ProgramList>
    </ProgramRecommendWrapper>
  )
}
