import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'

import { UserWikiWrapper } from './UserWiki.styles'

export const UserWiki: FC<{ songId: number }> = ({ songId }) => {
  return (
    <UserWikiWrapper>
      <SectionHeader variant="simple" title="用户wiki" />
      <a
        className="wiki song-data"
        href={`https://music.163.com/#/wiki/song?songId=${songId}&type=1`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="file logo-file"></span>
        <span className="name">补充或修改歌曲资料</span>
      </a>
      <a
        className="wiki"
        href="https://music.163.com/#/wiki/task-center/m/st/wiki/task-center/recommend"
        target="_blank"
        rel="noreferrer"
      >
        <span className="file logo-file"></span>
        <span className="name">用户wiki任务中心</span>
      </a>
    </UserWikiWrapper>
  )
}
