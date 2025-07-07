import React, { memo, useMemo } from 'react'
import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeaderWrapper } from './SectionHeader.styles'
import { SectionHeaderVariant } from './types'

interface SectionHeaderProps {
  variant?: SectionHeaderVariant
  title: string
  titleLink?: string
  subTitle?: string
  keywords?: string[]
  moreLink?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({
  variant = 'default',
  title,
  titleLink,
  subTitle,
  keywords,
  moreLink,
}) => {
  const moreLinkText = useMemo(() => {
    switch (variant) {
      case 'primary':
        return '更多'
      case 'simple':
        return '查看全部 >'
      default:
        return '更多 >'
    }
  }, [variant])

  return (
    <SectionHeaderWrapper
      variant={variant}
      className={variant === 'primary' ? 'sprite_02' : ''}
    >
      <div className="left">
        {/* Title */}
        {titleLink ? (
          <NavLink className="title" to={titleLink}>
            {title}
          </NavLink>
        ) : (
          <span className="title">{title}</span>
        )}
        {/* Sub Title */}
        {subTitle && <span className="sub-title">{subTitle}</span>}
        {/* Keywords */}
        {keywords && (
          <div className="keyword-list">
            {keywords.map((item) => {
              return (
                <div className="item" key={item}>
                  <NavLink className="keyword" to={`${moreLink}${item}`}>
                    {item}
                  </NavLink>
                  <span className="divider">|</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {moreLink && (
        <div className="right">
          <NavLink className="more-link" to={moreLink}>
            {moreLinkText}
          </NavLink>
          {variant === 'primary' && <i className="icon sprite_02" />}
        </div>
      )}
    </SectionHeaderWrapper>
  )
}

export default memo(SectionHeader)
