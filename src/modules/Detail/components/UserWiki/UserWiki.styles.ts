import styled from 'styled-components'

import { Sprite, TextNavLink } from '@/components/Core'

export const FileLink = styled(TextNavLink)`
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: -4px;
`

export const FileIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'file',
  component: 'span',
})`
  display: inline-block;
  width: 20px;
  height: 20px;
`

export const WikiIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'wiki',
  component: 'span',
})`
  display: inline-block;
  width: 20px;
  height: 20px;
`
