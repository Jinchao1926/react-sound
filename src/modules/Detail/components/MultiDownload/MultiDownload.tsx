import type { FC } from 'react'

import { Box, Flex, Text } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'

import { Android, IOS, PC } from './MultiDownload.styles'

export const MultiDownload: FC = () => {
  return (
    <Box mb={24}>
      <SectionHeader variant="simple" title="网易云音乐多端下载" />
      <Flex justify="space-between" height={65} mt={20} mb={10}>
        <IOS href="https://itunes.apple.com/cn/app/id590338362">iPhone</IOS>
        <PC href="https://music.163.com/api/pc/download/latest">PC</PC>
        <Android href="https://music.163.com/api/android/download/latest2">
          Android
        </Android>
      </Flex>
      <Text color="#999">同步歌单，随时畅听好音乐</Text>
    </Box>
  )
}
