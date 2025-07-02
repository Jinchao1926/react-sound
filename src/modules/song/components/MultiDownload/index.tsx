import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import SectionHeaderMore from '@/components/SectionHeaderMore'

import { MultiDownloadWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const MultiDownload: FC<IProps> = () => {
  return (
    <MultiDownloadWrapper>
      <SectionHeaderMore title="网易云音乐多端下载" />
      <div className="list sprite_download">
        <a
          className="iOS sprite_download"
          href="https://itunes.apple.com/cn/app/id590338362"
        >
          iPhone
        </a>
        <a
          className="pc sprite_download"
          href="https://music.163.com/api/pc/download/latest"
        >
          PC
        </a>
        <a
          className="android sprite_download"
          href="https://music.163.com/api/android/download/latest2"
        >
          Android
        </a>
      </div>
      <span className="tip">同步歌单，随时畅听320k好音乐</span>
    </MultiDownloadWrapper>
  )
}

export default memo(MultiDownload)
