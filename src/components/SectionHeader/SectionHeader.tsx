import React, { memo, useMemo } from 'react'
import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeaderWrapper } from './SectionHeader.styles'
import { SectionHeaderVariant } from './types'

interface SectionHeaderProps {
  variant?: SectionHeaderVariant
  title: string
  titleHref?: string
  subtitle?: string
  tags?: string[] | Array<{ name: string; href: string }>
  tagsHref?: string
  moreHref?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({
  variant = 'default',
  title,
  titleHref,
  subtitle,
  tags,
  tagsHref,
  moreHref,
}) => {
  const tagLinkHref = tagsHref || moreHref

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
        {titleHref ? (
          <NavLink className="title" to={titleHref}>
            {title}
          </NavLink>
        ) : (
          <span className="title">{title}</span>
        )}
        {/* Sub Title */}
        {subtitle && <span className="sub-title">{subtitle}</span>}
        {/* Tags */}
        {tags && (
          <div className="tag-list">
            {tags.map((item) => {
              const isObject = typeof item === 'object'
              return (
                <div className="item" key={isObject ? item.name : item}>
                  <NavLink
                    className="tag"
                    to={isObject ? item.href : `${tagLinkHref}${item}`}
                  >
                    {isObject ? item.name : item}
                  </NavLink>
                  <span className="divider">|</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {moreHref && (
        <div className="right">
          <NavLink className="more-link" to={moreHref}>
            {moreLinkText}
          </NavLink>
          {variant === 'primary' && <i className="icon sprite_02" />}
        </div>
      )}
    </SectionHeaderWrapper>
  )
}

export default memo(SectionHeader)
