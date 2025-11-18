import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { Strong } from '@/components/Core/Common/Text'
import { MVLogo } from '@/components/Shared/Logo'
import {
  AddToButtonSM,
  CollectButtonSM,
  DownloadButton,
  PlayButtonSMLight,
  ShareButton,
} from '@/components/Shared/Media'
import { UserLink } from '@/components/UserLink'
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

export const PlaylistTracks: FC<{ playlist: PlaylistDetail }> = ({
  playlist,
}) => {
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
      <PlaylistTracksTable>
        <PlaylistTracksTHeader>
          <tr>
            <PlaylistTrackTH width={77} />
            <PlaylistTrackTH>标题</PlaylistTrackTH>
            <PlaylistTrackTH width={91}>时长</PlaylistTrackTH>
            <PlaylistTrackTH width={173}>歌手</PlaylistTrackTH>
          </tr>
        </PlaylistTracksTHeader>
        <tbody>
          {playlist.tracks?.map((item, idx) => (
            <tr key={item.id}>
              {/* Ranking */}
              <td>
                <Flex justify="center" height={18} lineHeight={18}>
                  <Text width={25} color="#999" textAlign="center">
                    {idx + 1}
                  </Text>
                  <Box width={32}>
                    <New />
                  </Box>
                </Flex>
              </td>
              {/* Song */}
              <td>
                <Flex align="center">
                  {
                    // 前三行显示 Image
                    idx < 3 ? (
                      <NavLink to={`/song?id=${item.id}`}>
                        <Image
                          src={formatSizedImage(item.al.picUrl, 50)}
                          alt=""
                          mr={10}
                        />
                      </NavLink>
                    ) : null
                  }
                  <PlayButtonSMLight flexShrink={0} onClick={() => {}} />
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
                  {
                    // MV
                    item.mv !== 0 && (
                      <NavLink to={`/mv?id=${item.mv}`}>
                        <MVLogo mt={2} ml={2} />
                      </NavLink>
                    )
                  }
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
            </tr>
          ))}
        </tbody>
      </PlaylistTracksTable>
    </Box>
  )
}
