import React, { FC, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExternalLink } from '@/components/Links'
import { JCPagination } from '@/components/Pagination'
import {
  AddToButtonSM,
  DownloadButton,
  PlayButtonSMLight,
  ShareButton,
} from '@/components/Shared/Media'
import { useRadioProgramsQuery } from '@/hooks/program/useRadioProgramsQuery'
import { useUrlParams } from '@/hooks/useUrlParams'
import { routeBuilder } from '@/routers'
import { formatPlayCount } from '@/utils/dataFormat'
import { formatMinuteSecond, formatYearMonthDay } from '@/utils/timeFormat'

import {
  ProgramCollectionCol,
  ProgramCollectionHeaderWrapper,
  ProgramCollectionTable,
  ProgramNameTD,
  SocialActions,
} from './RadioPrograms.styles'
import { RadioSort } from './RadioSort'

const PAGE_SIZE = 100

export const RadioPrograms: FC<{ radioId: number }> = ({ radioId }) => {
  const navigate = useNavigate()
  const queryParams = useUrlParams()

  const [currentPage, setCurrentPage] = useState<number>(1)

  // Parse asc from URL: order=1 means asc=false, order=2 means asc=true
  const asc = useMemo(() => {
    const order = queryParams.get('order')
    return order === '2'
  }, [queryParams])

  const { data: programs, count } = useRadioProgramsQuery({
    radioId,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
    asc,
  })

  const handleSortChange = (newAsc: boolean) => {
    const newOrder = newAsc ? '2' : '1'
    queryParams.set('order', newOrder)
    navigate({ search: queryParams.toString() }, { replace: true })
    setCurrentPage(1)
  }

  return (
    <Box>
      <ProgramCollectionHeaderWrapper>
        <Box>
          <Text fontSize={20} lineHeight={28}>
            节目列表
          </Text>
          <Text color="#666" ml={20} mt={9}>
            共{count}期
          </Text>
        </Box>
        <Flex gap={20} align="center">
          <ExternalLink id={radioId} type="radio" underline={false} />
          <RadioSort asc={asc} onChange={handleSortChange} />
        </Flex>
      </ProgramCollectionHeaderWrapper>

      <ProgramCollectionTable>
        {/* Define col width - Even if the header is hidden, the column width can still be controlled */}
        <colgroup>
          <ProgramCollectionCol width={83} />
          <ProgramCollectionCol />
          <ProgramCollectionCol width={80} />
          <ProgramCollectionCol width={90} />
          <ProgramCollectionCol width={86} />
          <ProgramCollectionCol width={60} />
        </colgroup>

        <tbody>
          {programs.map((program, idx) => (
            <tr key={program.id}>
              {/* Index */}
              <td>
                <Flex justify="space-between" lineHeight={18}>
                  <Text width={25} color="#999" textAlign="center">
                    {asc
                      ? (currentPage - 1) * PAGE_SIZE + idx + 1
                      : count - (currentPage - 1) * PAGE_SIZE - idx}
                  </Text>
                  <PlayButtonSMLight onClick={() => {}} />
                </Flex>
              </td>
              {/* Program & Actions */}
              <ProgramNameTD>
                <TextNavLink
                  to={routeBuilder.program(program.id)}
                  color="#333"
                  nowrap
                >
                  {program.name}
                </TextNavLink>

                <SocialActions>
                  <AddToButtonSM onClick={() => {}} />
                  <ShareButton onClick={() => {}} />
                  <DownloadButton onClick={() => {}} />
                </SocialActions>
              </ProgramNameTD>
              {/* Play count */}
              <td>
                <Text color="#666" nowrap>
                  播放{formatPlayCount(program.listenerCount)}
                </Text>
              </td>
              {/* Like */}
              <td>
                <Text color="#666" nowrap>
                  赞{formatPlayCount(program.likedCount)}
                </Text>
              </td>
              {/* Time */}
              <td>
                <Text color="#999" nowrap>
                  {formatYearMonthDay(program.createTime)}
                </Text>
              </td>
              {/* Duration */}
              <td>
                <Text color="#999" nowrap>
                  {formatMinuteSecond(program.duration)}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </ProgramCollectionTable>

      <JCPagination
        total={count}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  )
}
