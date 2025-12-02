import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { routeBuilder } from '@/routers'

export const RadioCategoryLinkWrapper = styled(NavLink)`
  display: inline-block;
  color: #cc0000;
  border: 1px solid #cc0000;
  padding: 0 6px;
  line-height: 16px;

  &:hover {
    background-color: #fbefee;
  }
`

interface RadioCategoryLinkProps {
  category: { id: number; name: string }
}

export const RadioCategoryLink: FC<RadioCategoryLinkProps> = ({
  category: { id, name },
}) => {
  return (
    <RadioCategoryLinkWrapper to={routeBuilder.discoverRadioCategory(id)}>
      {name}
    </RadioCategoryLinkWrapper>
  )
}
