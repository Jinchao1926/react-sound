import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import {
  NewAlbumWrapper
} from './style'
import SectionHeaderRCM from '@/components/section-header-rcm'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  return (
    <NewAlbumWrapper>
      <SectionHeaderRCM title='新碟上架' morePath='/discover/album'/>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)