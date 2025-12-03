import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Sprite } from '@/components/Core'

export const ArtistCategoryItem = styled.div`
  &:not(:last-child)::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #d3d3d3;
    margin: 5px 0 16px 0;
  }
`

export const ArtistCategoryHeader = styled.h2`
  margin: 0;
  padding-left: 14px;
  line-height: 25px;
  font-family: 'Microsoft Yahei"';
  font-size: 16px;
  color: #333;
`

export const ArtistCategoryLink = styled(Sprite).attrs<{ $selected?: boolean }>(
  (props) => ({
    sprite: 'selection',
    icon: props.$selected ? 'selected' : 'normal',
    component: NavLink,
  })
)<{ $selected?: boolean }>`
  display: block;
  padding-left: 27px;
  line-height: 29px;
  color: ${(props) => (props.$selected ? '#c20c0c' : '#333')};
`
