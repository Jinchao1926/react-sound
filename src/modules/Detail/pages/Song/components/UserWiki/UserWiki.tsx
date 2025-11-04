import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box } from '@/components/UI'

import { FileIcon, FileLink } from './UserWiki.styles'

export const UserWiki: FC<{ songId: number }> = ({ songId }) => {
  return (
    <Box>
      <SectionHeader variant="simple" title="用户wiki" />
      <FileLink
        to={`https://music.163.com/#/wiki/song?songId=${songId}&type=1`}
        mt={20}
      >
        <FileIcon />
        补充或修改歌曲资料
      </FileLink>
      <FileLink
        to="https://music.163.com/#/wiki/task-center/m/st/wiki/task-center/recommend"
        color="#333"
      >
        <FileIcon />
        用户wiki任务中心
      </FileLink>
    </Box>
  )
}
