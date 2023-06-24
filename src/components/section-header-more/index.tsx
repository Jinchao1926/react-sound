import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeaderMoreWrapper } from './style'

interface IProps {
  children?: ReactNode,
  title: string,
  morePath?: string
}

const SectionHeaderMore: FC<IProps> = (props: IProps) => {
  const { title, morePath } = props
  const showMorePath = (morePath !== null && morePath !== undefined)

  return (
    <SectionHeaderMoreWrapper>
      <span className='title'>{title}</span>
      { showMorePath && <a href={morePath}>查看更多 &gt;</a>}
    </SectionHeaderMoreWrapper>
  )
}

export default memo(SectionHeaderMore)