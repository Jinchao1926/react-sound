import React, { type FC } from 'react'

import {
  TrackCollectionButton,
  TrackCollectionExpandableHeader,
  TrackCollectionExpandIcon,
  TrackCollectionHeaderWrapper,
} from './TrackCollectionHeader.styles'
import { Box, Flex, Strong, Text } from '../Core'
import { ExternalLink, ExternalLinkType } from '../Links'

interface TrackCollectionHeaderProps {
  config: {
    headerTitle?: string
    showExpandableHeader?: boolean
    showExternalLink?: boolean
    externalId?: number
    externalType: ExternalLinkType
    trackCount?: number
    playCount?: number
  }
  expanded: boolean
  onExpand: (expand: boolean) => void
}

export const TrackCollectionHeader: FC<TrackCollectionHeaderProps> = ({
  config: {
    headerTitle = '歌曲列表',
    showExpandableHeader = false,
    showExternalLink = false,
    externalId,
    externalType,
    trackCount,
    playCount,
  },
  expanded,
  onExpand,
}) => {
  return (
    <>
      {showExpandableHeader ? (
        <TrackCollectionExpandableHeader>
          <Text>
            <Strong>{headerTitle}</Strong>
            {trackCount ? `（${trackCount}首歌）` : ''}
          </Text>
          <TrackCollectionButton onClick={() => onExpand(!expanded)}>
            {expanded ? '收起' : '展开'}
            <TrackCollectionExpandIcon $expanded={expanded} />
          </TrackCollectionButton>
        </TrackCollectionExpandableHeader>
      ) : (
        <TrackCollectionHeaderWrapper>
          <Box>
            <Text fontSize={20} lineHeight={28}>
              {headerTitle}
            </Text>
            <Text color="#666" ml={20} mt={9}>
              {trackCount ? `${trackCount}首歌` : ''}
            </Text>
          </Box>
          <Flex gap={20} align="center">
            {showExternalLink && externalId && (
              <ExternalLink id={externalId} type={externalType} />
            )}
            {playCount && (
              <Text color="#666">
                播放： <Strong color="#c20c0c">{playCount}</Strong>次
              </Text>
            )}
          </Flex>
        </TrackCollectionHeaderWrapper>
      )}
    </>
  )
}
