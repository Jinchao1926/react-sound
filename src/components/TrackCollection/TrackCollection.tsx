import React, { FC, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { Strong } from '@/components/Core/Common/Text'
import { MVLink, UserLink } from '@/components/Links'
import {
  AddToButtonSM,
  CollectButtonSM,
  DownloadButton,
  PlayButtonSMLight,
  ShareButton,
} from '@/components/Shared/Media'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatMinuteSecond } from '@/utils/timeFormat'

import {
  Actions,
  DownloadLink,
  DownloadText,
  Duration,
  DurationTD,
  New,
  TrackCollectionHeader,
  TrackCollectionTable,
  TrackCollectionTH,
  TrackCollectionTHeader,
} from './TrackCollection.styles'
import { TrackCollectionConfig, TrackSource } from './TrackCollection.type'
import { OutchainLink } from '../Links/OutchainLink'

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
    showOutchainLink = false,
    outchainType = 'playlist',
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

  const { tracks, hasMoreTracks } = useMemo(() => {
    if (maxRows) {
      return {
        tracks: dataSource.tracks.slice(0, maxRows),
        hasMoreTracks: dataSource.tracks.length > maxRows,
      }
    }
    return { tracks: dataSource.tracks, hasMoreTracks: false }
  }, [dataSource.tracks, maxRows])

  return (
    <Box>
      <TrackCollectionHeader>
        <Box>
          <Text fontSize={20} lineHeight={28}>
            歌曲列表
          </Text>
          <Text color="#666" ml={20} mt={9}>
            {dataSource.trackCount}首歌
          </Text>
        </Box>
        <Flex gap={20} align="center">
          {showOutchainLink && (
            <OutchainLink id={dataSource.id} type={outchainType} />
          )}
          {dataSource.playCount && (
            <Text color="#666">
              播放： <Strong color="#c20c0c">{dataSource.playCount}</Strong>次
            </Text>
          )}
        </Flex>
      </TrackCollectionHeader>
      <TrackCollectionTable $enlargeFirstThreeRows={showTitleCoverImage}>
        <TrackCollectionTHeader>
          <tr>
            <TrackCollectionTH width={columnWidths.index} />
            <TrackCollectionTH width={columnWidths.title}>
              标题
            </TrackCollectionTH>
            <TrackCollectionTH width={columnWidths.duration}>
              时长
            </TrackCollectionTH>
            <TrackCollectionTH width={columnWidths.artist}>
              歌手
            </TrackCollectionTH>
            {showAlbumColumn && (
              <TrackCollectionTH width={columnWidths.album}>
                专辑
              </TrackCollectionTH>
            )}
          </tr>
        </TrackCollectionTHeader>
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
                      <NavLink to={`/song?id=${item.id}`}>
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
                    to={`/song?id=${item.id}`}
                    color="#333"
                    nowrap
                    ml={8}
                  >
                    {item.name}
                  </TextNavLink>

                  {
                    // Alias
                    ((item.tns && item.tns.length > 0) ||
                      item.alia.length > 0) && (
                      <Text nowrap color="#aeaeae">
                        &nbsp;-&nbsp;(
                        {(item.tns && item.tns.length > 0 && item.tns[0]) ||
                          item.alia[0]}
                        )
                      </Text>
                    )
                  }
                  <MVLink mvID={item.mv} />
                </Flex>
              </td>
              {/* Duration & Action */}
              <DurationTD>
                <Duration>{formatMinuteSecond(item.dt)}</Duration>
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
                    to={`/album?id=${item.al.id}`}
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
