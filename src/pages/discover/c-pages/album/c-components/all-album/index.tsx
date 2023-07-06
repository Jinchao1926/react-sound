import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { AllAlbumWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode
}

const AllAlbum: FC<IProps> = () => {
  const [keywords] = useState(['全部', '华语', '欧美', '韩国', '日本'])
  return (
    <AllAlbumWrapper>
      <SectionHeaderNormal title='全部新碟' keywords={keywords}/>
    </AllAlbumWrapper>
  )
}

export default memo(AllAlbum)