import { type FC } from 'react'

import { Box, Flex } from '@/components/Core'
import { routeBuilder } from '@/routers'

import { Music, NoDataLink, NoDataText } from './PlaylistNoData.styles'

export const PlaylistNoData: FC = () => {
  return (
    <Box pt={85}>
      <Flex gap={3} align="center" justify="center">
        <Music />
        <NoDataText>你还没有添加任何歌曲</NoDataText>
      </Flex>
      <Box textAlign="center">
        <NoDataText>
          去首页
          <NoDataLink to={routeBuilder.discover()} color="#aaa">
            发现音乐
          </NoDataLink>
          ，或在
          <NoDataLink to={routeBuilder.mine()} color="#aaa">
            我的音乐
          </NoDataLink>
          收听自己收藏的歌单。
        </NoDataText>
      </Box>
    </Box>
  )
}
