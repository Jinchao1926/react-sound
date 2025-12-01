import React, { FC, useMemo, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { MVLink, UserLink } from '@/components/Links'
import {
  AddToButtonSM,
  CollectButtonSM,
  DownloadButton,
  PlayButtonSMLight,
  ShareButton,
} from '@/components/Shared/Media'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatMinuteSecond } from '@/utils/timeFormat'

import {
  Actions,
  DownloadLink,
  DownloadText,
  Duration,
  DurationTD,
  New,
  TrackCollectionCol,
  TrackCollectionTable,
  TrackCollectionTH,
  TrackCollectionTHeader,
} from './TrackCollection.styles'
import { TrackCollectionConfig, TrackSource } from './TrackCollection.type'
import { TrackCollectionHeader } from './TrackCollectionHeader'

export interface TrackCollectionProps {
  dataSource: TrackSource
  config?: TrackCollectionConfig
}

export const TrackCollection: FC<TrackCollectionProps> = ({
  dataSource,
  config = {},
}) => {
  const {
    maxRows,
    headerTitle,
    showExpandableHeader = false,
    showExternalLink = false,
    externalLinkType = 'playlist',
    showAlbumColumn = false,
    showIndexTrend = true,
    showTitleCoverImage = true,
    columnWidths = {
      index: 77,
      title: undefined, // auto
      duration: 91,
      artist: 173,
    },
  } = config

  const [expanded, setExpanded] = useState(true)

  const { tracks, hasMoreTracks } = useMemo(() => {
    if (maxRows) {
      return {
        tracks: expanded ? dataSource.tracks.slice(0, maxRows) : [],
        hasMoreTracks: dataSource.tracks.length > maxRows,
      }
    }
    return { tracks: expanded ? dataSource.tracks : [], hasMoreTracks: false }
  }, [dataSource.tracks, maxRows, expanded])

  return (
    <Box>
      <TrackCollectionHeader
        config={{
          headerTitle,
          showExpandableHeader,
          showExternalLink,
          externalId: dataSource.id,
          externalType: externalLinkType,
          trackCount: dataSource.trackCount,
          playCount: dataSource.playCount,
        }}
        expanded={expanded}
        onExpand={setExpanded}
      />

      <TrackCollectionTable $enlargeFirstThreeRows={showTitleCoverImage}>
        {/* Define col width - Even if the header is hidden, the column width can still be controlled */}
        <colgroup>
          <TrackCollectionCol width={columnWidths.index} />
          <TrackCollectionCol width={columnWidths.title} />
          <TrackCollectionCol width={columnWidths.duration} />
          <TrackCollectionCol width={columnWidths.artist} />
          {showAlbumColumn && <TrackCollectionCol width={columnWidths.album} />}
        </colgroup>

        {!showExpandableHeader && (
          <TrackCollectionTHeader>
            <tr>
              <TrackCollectionTH />
              <TrackCollectionTH>标题</TrackCollectionTH>
              <TrackCollectionTH>时长</TrackCollectionTH>
              <TrackCollectionTH>歌手</TrackCollectionTH>
              {showAlbumColumn && <TrackCollectionTH>专辑</TrackCollectionTH>}
            </tr>
          </TrackCollectionTHeader>
        )}

        <tbody>
          {tracks.map((item, idx) => (
            <tr key={item.id}>
              {/* Index */}
              <td>
                <Flex
                  justify={showIndexTrend ? 'center' : 'space-between'}
                  lineHeight={18}
                >
                  <Text width={25} color="#999" textAlign="center">
                    {idx + 1}
                  </Text>
                  {showIndexTrend ? (
                    <Box width={32}>
                      <New />
                    </Box>
                  ) : (
                    <PlayButtonSMLight onClick={() => {}} />
                  )}
                </Flex>
              </td>
              {/* Song */}
              <td>
                <Flex align="center">
                  {
                    // 前三行显示 Image
                    showTitleCoverImage && idx < 3 ? (
                      <NavLink to={routeBuilder.song(item.id)}>
                        <Image
                          src={formatSizedImage(item.al.picUrl, 50)}
                          alt=""
                          mr={10}
                        />
                      </NavLink>
                    ) : null
                  }
                  {showIndexTrend && <PlayButtonSMLight onClick={() => {}} />}
                  <TextNavLink
                    to={routeBuilder.song(item.id)}
                    color="#333"
                    nowrap
                    ml={8}
                  >
                    {item.name}
                  </TextNavLink>

                  {
                    // Alias
                    item.tns && item.tns.length > 0 ? (
                      <Text nowrap color="#aeaeae">
                        &nbsp;-&nbsp;({item.tns[0]})
                      </Text>
                    ) : item.alia && item.alia.length > 0 ? (
                      <Text nowrap color="#aeaeae">
                        &nbsp;-&nbsp;({item.alia[0]})
                      </Text>
                    ) : null
                  }

                  <MVLink mvID={item.mv} />
                </Flex>
              </td>
              {/* Duration & Action */}
              <DurationTD>
                <Duration nowrap>{formatMinuteSecond(item.dt)}</Duration>
                <Actions>
                  <AddToButtonSM onClick={() => {}} />
                  <CollectButtonSM onClick={() => {}} />
                  <ShareButton onClick={() => {}} />
                  <DownloadButton onClick={() => {}} />
                </Actions>
              </DurationTD>
              {/* Singer */}
              <td>
                <UserLink users={item.ar} block color="#333" />
              </td>
              {/* Album */}
              {showAlbumColumn && (
                <td>
                  <TextNavLink
                    to={routeBuilder.album(item.al.id)}
                    color="#333"
                    nowrap
                  >
                    {item.al.name}
                  </TextNavLink>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TrackCollectionTable>

      {hasMoreTracks && (
        <Flex vertical align="center" gap={20} mt={30}>
          <DownloadText>查看更多内容，请下载客户端</DownloadText>
          <DownloadLink to="/download">立即下载</DownloadLink>
        </Flex>
      )}
    </Box>
  )
}
