import React, { FC, useState, useEffect } from 'react'

import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { JCPagination } from '@/components/Pagination'
import { SectionHeader } from '@/components/SectionHeader'
import { Box, Flex, Paragraph, TextNavLink } from '@/components/UI'
import { useTopRadiosQuery } from '@/hooks/djradio/useTopRadiosQuery'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  RadioItem,
  RadioName,
  RadioCreatorIcon,
  RadioList,
} from './RadioRanking.styles'

const PAGE_SIZE = 30

export const RadioRanking: FC<{ id: number }> = ({ id }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    setCurrentPage(1)
  }, [id])

  const { data: radios, count } = useTopRadiosQuery({
    cateId: id,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  return (
    <Box mt={35}>
      <SectionHeader title="电台排行榜" />
      <RadioList>
        {radios.map((item) => (
          <RadioItem key={item.id}>
            <CoverImage
              src={formatSizedImage(item.picUrl, 120)}
              alt={item.name}
              to={`/djradio?id=${item.id}`}
              size={120}
            />

            <Box ml={20}>
              <RadioName>{item.name}</RadioName>
              <Flex align="center" mb={8} lineHeight={20}>
                <RadioCreatorIcon />
                <TextNavLink to={`/user/home?=${item.dj.userId}`} ml={8} mr={3}>
                  {item.dj.nickname}
                </TextNavLink>
                <IdentityIcon avatarDetail={item.dj.avatarDetail} />
              </Flex>
              <Paragraph color="#999" whiteSpace="pre">
                {`共${item.programCount}期`} {`订阅${item.subCount}次`}
              </Paragraph>
            </Box>
          </RadioItem>
        ))}
      </RadioList>
      <JCPagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  )
}
