import { Fragment, type FC, useEffect, useState } from 'react'

import classNames from 'classnames'

import { Box, Flex, Image, Text } from '@/components/Core'
import { routeBuilder } from '@/routers'
import { type TopPlaylist } from '@/types/playlist'
import { formatSizedImage } from '@/utils/format/dataFormat'

import { CategoryHead, CategoryLink } from './ToplistCategory.styles'

interface ToplistCategoryProps {
  id?: number
  toplists: TopPlaylist[]
}

export const ToplistCategory: FC<ToplistCategoryProps> = ({ id, toplists }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (id) {
      const idx = toplists.findIndex((item) => item.id === id)
      if (idx !== -1) {
        setSelectedIndex(idx)
      }
    }
  }, [toplists, id])

  return (
    <Box mt={40}>
      {toplists.map((item, idx) => {
        const header =
          idx === 0 ? (
            <CategoryHead level={2} m={0}>
              云音乐特色榜
            </CategoryHead>
          ) : idx === 4 ? (
            <CategoryHead level={2} mt={20} mb={0}>
              全球媒体榜
            </CategoryHead>
          ) : null

        return (
          <Fragment key={item.id}>
            {header}
            <CategoryLink
              className={classNames({ selected: selectedIndex === idx })}
              to={routeBuilder.discoverToplist(item.id)}
            >
              <Flex gap={10} height={40} mr={16} nowrap>
                <Image src={formatSizedImage(item.coverImgUrl, 40)} alt="" />
                <Flex vertical justify="space-between" py={2}>
                  <Text color="#000" nowrap>
                    {item.name}
                  </Text>
                  <Text color="#999">{item.updateFrequency}</Text>
                </Flex>
              </Flex>
            </CategoryLink>
          </Fragment>
        )
      })}
    </Box>
  )
}
