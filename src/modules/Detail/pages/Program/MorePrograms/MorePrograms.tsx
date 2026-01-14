import { type FC } from 'react'

import { Box, Text, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { useRadioProgramsQuery } from '@/hooks/program/useRadioProgramsQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/format/dataFormat'

import { ProgramItem } from './MorePrograms.styles'

export const MorePrograms: FC<{ radioId: number }> = ({ radioId }) => {
  const { data: programs } = useRadioProgramsQuery({
    radioId,
    limit: 5,
  })

  return (
    <Box mb={40}>
      <SectionHeader
        variant="simple"
        title="更多节目"
        moreHref={routeBuilder.radio(radioId)}
        moreTitle="全部 >"
      />
      <Box mt={20}>
        {programs.map((program) => (
          <ProgramItem key={program.id}>
            <CoverImage
              src={formatSizedImage(program.coverUrl, 50)}
              to={routeBuilder.program(program.id)}
              alt={program.name}
              size={50}
            />

            <Box width={140}>
              <TextNavLink
                to={routeBuilder.program(program.id)}
                fontSize={14}
                lineHeight={24}
                color="#000"
                nowrap
              >
                {program.name}
              </TextNavLink>

              <Text color="#999" lineHeight={24}>
                Vol.{program.serialNum}
              </Text>
            </Box>
          </ProgramItem>
        ))}
      </Box>
    </Box>
  )
}
