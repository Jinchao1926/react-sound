import styled from 'styled-components'

import { Flex, Sprite } from '../Core'

export const TrackCollectionHeaderWrapper = styled(Flex)`
  height: 33px;
  border-bottom: 2px solid #c20c0c;
  justify-content: space-between;
  align-items: center;
`

export const TrackCollectionExpandableHeader = styled(Flex)`
  height: 33px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  background-color: #f7f7f7;
  justify-content: space-between;
  align-items: center;
`

export const TrackCollectionButton = styled.button`
  padding: 0;
  color: #666;

  :hover {
    text-decoration: underline;
  }
`

export const TrackCollectionExpandIcon = styled(Sprite).attrs<{
  $expanded: boolean
}>((props) => ({
  sprite: 'icon',
  icon: props.$expanded ? 'chevronUp' : 'chevronDown',
  component: 'span',
}))`
  display: inline-block;
  width: 9px;
  height: 5px;
  margin-left: 5px;
`
