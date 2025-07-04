import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeaderWrapper } from './SectionHeader.styles'

interface SectionHeaderProps {
  title: string
  keywords?: string[]
  morePath: string
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  keywords,
  morePath,
}) => {
  return (
    <SectionHeaderWrapper className="sprite_02">
      <div className="left">
        <NavLink className="title" to={morePath}>
          {title}
        </NavLink>
        <div className="keyword-list">
          {keywords?.map((item) => {
            return (
              <div className="item" key={item}>
                <NavLink className="keyword" to={`${morePath}${item}`}>
                  {item}
                </NavLink>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <NavLink to={morePath}>更多</NavLink>
        <i className="icon sprite_02" />
      </div>
    </SectionHeaderWrapper>
  )
}
