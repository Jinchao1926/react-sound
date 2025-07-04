import React, { FC, memo } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeaderMoreWrapper } from './style'

interface SectionHeaderMoreProps {
  title: string
  morePath?: string
}

const SectionHeaderMore: FC<SectionHeaderMoreProps> = ({ title, morePath }) => {
  return (
    <SectionHeaderMoreWrapper>
      <span className="title">{title}</span>
      {morePath && <NavLink to={morePath}>查看更多 &gt;</NavLink>}
    </SectionHeaderMoreWrapper>
  )
}

export default memo(SectionHeaderMore)
