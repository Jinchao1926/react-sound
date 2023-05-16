import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode,
  title: string,
  morePath?: string
}

const SectionHeaderV2: FC<IProps> = (props: IProps) => {
  const { title, morePath } = props
  const showMorePath = (morePath !== null && morePath !== undefined)

  return (
    <SectionHeaderV2Wrapper>
      <span className='title'>{title}</span>
      { showMorePath && <a href={morePath}>查看更多 &gt;</a>}
    </SectionHeaderV2Wrapper>
  )
}

export default memo(SectionHeaderV2)