import React, { useMemo } from 'react'
import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import {
  Divider,
  PrimaryMore,
  SectionHeaderWrapper,
  SubTitle,
  Title,
} from './SectionHeader.styles'
import { SectionHeaderVariant } from './types'
import { Box, Flex, TextNavLink } from '../Core'

interface SectionHeaderProps {
  variant?: SectionHeaderVariant
  title: string
  titleHref?: string
  subtitle?: string
  tags?: string[] | Array<{ name: string; href: string }>
  tagsHref?: string
  moreHref?: string
}

export const SectionHeader: FC<SectionHeaderProps> = ({
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
    <SectionHeaderWrapper variant={variant} disable={variant !== 'primary'}>
      <Flex align="center">
        {/* Title */}
        <Title
          as={titleHref ? NavLink : 'span'}
          variant={variant}
          {...(titleHref && { to: titleHref })}
        >
          {title}
        </Title>
        {/* Sub Title */}
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        {/* Tags */}
        {tags && (
          <Flex ml={variant === 'default' ? 20 : 0}>
            {tags.map((tag, index) => {
              const isObject = typeof tag === 'object'
              return (
                <Box key={isObject ? tag.name : tag}>
                  <TextNavLink
                    to={isObject ? tag.href : `${tagLinkHref}${tag}`}
                  >
                    {isObject ? tag.name : tag}
                  </TextNavLink>
                  {index < tags.length - 1 && (
                    <Divider variant={variant}>|</Divider>
                  )}
                </Box>
              )
            })}
          </Flex>
        )}
      </Flex>

      {moreHref && (
        <Box mt={variant === 'default' ? 10 : 0}>
          <TextNavLink to={moreHref}>{moreLinkText}</TextNavLink>
          {variant === 'primary' && <PrimaryMore />}
        </Box>
      )}
    </SectionHeaderWrapper>
  )
}
