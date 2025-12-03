import { useMemo, type FC } from 'react'

import { Box } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'

import { FileIcon, FileLink, WikiIcon } from './UserWiki.styles'

export interface UserWikiProps {
  id: number
  type: 'song' | 'album' | 'mv'
}

export const UserWiki: FC<UserWikiProps> = ({ id, type }) => {
  const { link, name } = useMemo(() => {
    switch (type) {
      case 'song':
        return {
          link: `https://music.163.com/#/wiki/song?songId=${id}&type=1`,
          name: '歌曲',
        }
      case 'album':
        return {
          link: `https://music.163.com/#/wiki/album?albumId=${id}`,
          name: '专辑',
        }
      case 'mv':
        return {
          link: `https://music.163.com/#/wiki/mv?mvId=${id}`,
          name: 'MV',
        }
      default:
        return { link: '', name: '' }
    }
  }, [id, type])

  return (
    <Box>
      <SectionHeader variant="simple" title="用户wiki" />
      <FileLink to={link} mt={20}>
        <FileIcon />
        补充或修改{name}资料
      </FileLink>
      <FileLink
        to="https://music.163.com/#/wiki/task-center/m/st/wiki/task-center/recommend"
        color="#333"
      >
        <WikiIcon />
        用户wiki任务中心
      </FileLink>
    </Box>
  )
}
