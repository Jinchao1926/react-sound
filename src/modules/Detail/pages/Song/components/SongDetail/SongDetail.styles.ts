import styled from 'styled-components'

import { Flex } from '@/components/UI'
import { Sprite } from '@/components/UI/Spirit/Sprite'

export const SongDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SongCD = styled.div`
  width: 198px;
  height: 198px;
  position: relative;

  img {
    width: 130px;
    height: 130px;
    margin: 34px;
  }
`

export const SongCDCover = styled(Sprite).attrs({
  sprite: 'cover',
  icon: 'CD',
})`
  position: absolute;
  width: 206px;
  height: 205px;
  top: -4px;
  left: -4px;
  background-position: -140px -580px;
`

export const MusicIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'music',
  component: 'span',
})`
  display: inline-block;
  width: 16px;
  height: 16px;
`

export const MusicLink = styled.a`
  color: #0c73c2;
  text-decoration: underline;
`

export const OpenClientButton = styled.button`
  margin: 10px 0 0 12px;
  width: 176px;
  height: 35px;
  color: #283248;
  background-color: rgba(40, 50, 72, 0.03);
  border: solid 1px rgba(40, 50, 72, 0.25);
  border-radius: 6px;
`

export const SongLink = styled(Flex)`
  align-items: center;
  margin: 10px 0;
  color: #999;
`

export const LyricList = styled.div`
  display: inline-block;
  margin-top: 38px;
  line-height: 23px;
  white-space: pre-line;
`

export const ExpandButton = styled.div`
  margin-top: 5px;
  color: #0c73c2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const ExpandIcon = styled(Sprite).attrs<{ expanded: boolean }>(
  (props) => ({
    sprite: 'icon',
    icon: props.expanded ? 'expand' : 'collapse',
    component: 'span',
  })
)`
  display: inline-block;
  width: 11px;
  height: 8px;
`
