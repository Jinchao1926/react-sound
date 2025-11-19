import React, { FC } from 'react'

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
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatMinuteSecond } from '@/utils/timeFormat'

import {
  Actions,
  Duration,
  DurationTD,
  New,
  PlaylistTracksHeader,
  PlaylistTracksTable,
  PlaylistTracksTHeader,
  PlaylistTrackTH,
} from './PlaylistTracks.styles'

interface PlaylistTracksConfig {
  showAlbumColumn?: boolean
  showIndexTrend?: boolean
  showTitleCoverImage?: boolean
  columnWidths: {
    index?: number
    title?: number
    duration?: number
    artist?: number
    album?: number
  }
}
export interface PlaylistTracksProps {
  playlist: PlaylistDetail
  config?: PlaylistTracksConfig
}

export const PlaylistTracks: FC<PlaylistTracksProps> = ({
  playlist,
  config = {
    showAlbumColumn: false,
    showIndexTrend: true,
    showTitleCoverImage: true,
    columnWidths: {
      index: 77,
      title: undefined, // auto
      duration: 91,
      artist: 173,
    },
  },
}) => {
  const { showAlbumColumn, showIndexTrend, showTitleCoverImage, columnWidths } =
    config

  return (
    <Box>
      <PlaylistTracksHeader>
        <Box>
          <Text fontSize={20} lineHeight={28}>
            歌曲列表
          </Text>
          <Text color="#666" ml={20} mt={9}>
            {playlist.trackCount}首歌
          </Text>
        </Box>
        <Text color="#666">
          播放： <Strong color="#c20c0c">{playlist.playCount}</Strong>次
        </Text>
      </PlaylistTracksHeader>
      <PlaylistTracksTable $enlargeFirstThreeRows={showTitleCoverImage}>
        <PlaylistTracksTHeader>
          <tr>
            <PlaylistTrackTH width={columnWidths.index} />
            <PlaylistTrackTH width={columnWidths.title}>标题</PlaylistTrackTH>
            <PlaylistTrackTH width={columnWidths.duration}>
              时长
            </PlaylistTrackTH>
            <PlaylistTrackTH width={columnWidths.artist}>歌手</PlaylistTrackTH>
            {showAlbumColumn && (
              <PlaylistTrackTH width={columnWidths.album}>专辑</PlaylistTrackTH>
            )}
          </tr>
        </PlaylistTracksTHeader>
        <tbody>
          {playlist.tracks?.map((item, idx) => (
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
      </PlaylistTracksTable>
    </Box>
  )
}
