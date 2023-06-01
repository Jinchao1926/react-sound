import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeaderV3Wrapper } from './style'

interface IProps {
  children?: ReactNode,
  title: string,
}

const SectionHeaderV3: FC<IProps> = (props: IProps) => {
  const { title } = props
  return (
    <SectionHeaderV3Wrapper>
      <span className='title'>{title}</span>
    </SectionHeaderV3Wrapper>
  )
}

export default memo(SectionHeaderV3)