import styled from 'styled-components'

import { Sprite } from '@/components/Core'

export const IOS = styled(Sprite).attrs({
  sprite: 'platformDownload',
  icon: 'iOS',
  component: 'a',
})`
  width: 42px;
  height: 48px;
  text-indent: -9999px;
`

export const PC = styled(Sprite).attrs({
  sprite: 'platformDownload',
  icon: 'pc',
  component: 'a',
})`
  width: 60px;
  height: 48px;
  text-indent: -9999px;
`

export const Android = styled(Sprite).attrs({
  sprite: 'platformDownload',
  icon: 'android',
  component: 'a',
})`
  width: 42px;
  height: 48px;
  text-indent: -9999px;
`
