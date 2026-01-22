import { type FC, useMemo, useRef } from 'react'

import { Helmet } from 'react-helmet-async'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { ExternalLink, MVLink, UserLink } from '@/components/Links'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { SongBadge, SongVIPBadge } from '@/components/Shared/Badge'
import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/format/dataFormat'
import { isVIPTrack } from '@/utils/track/trackUtils'

import {
  OpenClientButton,
  SongCD,
  SongCDCover,
  SongDetailWrapper,
  SongLink,
} from './SongDetail.styles'

export const SongDetail: FC<{ songId: number }> = ({ songId }) => {
  const lyricRef = useRef<HTMLDivElement>(null)

  const { data: song } = useSongDetailQuery(songId)
  const { data: lyric } = useSongLyricQuery(songId)
  const { playTrack, addToPlaylist } = usePlayerContext()

  const lyrics = useMemo(() => {
    return lyric.map((item) => item.text)
  }, [lyric])

  // 处理展开/收起时的滚动位置，保持按钮在视口中的位置不变
  const onExpandChange = () => {
    /*
    if (!lyricRef.current) return
    const scrollY = window.scrollY
    const rect = lyricRef.current.getBoundingClientRect()
    const buttonTop = rect.bottom // 按钮在底部

    requestAnimationFrame(() => {
      if (!lyricRef.current) return
      const newRect = lyricRef.current.getBoundingClientRect()
      const newButtonTop = newRect.bottom
      const offset = newButtonTop - buttonTop
      window.scrollTo(window.scrollX, scrollY + offset)
    })
      */
  }

  if (!song) return null

  const songArtists = song.ar.map((a) => a.name).join(' / ')

  return (
    <>
      <Helmet>
        <title>
          {song.name} - {songArtists} - 单曲 - React Sound
        </title>
        <meta name="description" content={`${song.name} - ${songArtists}`} />
      </Helmet>
      <SongDetailWrapper>
        <Box>
          <SongCD>
            <Image
              src={formatSizedImage(song.al.picUrl, 130)}
              alt={song.name}
              width={130}
              height={130}
              m={34}
            />
            <SongCDCover />
          </SongCD>
          <ExternalLink id={song.id} type="song" mt={20} ml={46} />
          <OpenClientButton>点击打开客户端</OpenClientButton>
        </Box>

        <Box width={414}>
          <Flex align="center" gap={8} pb={8}>
            {isVIPTrack(song) ? <SongVIPBadge /> : <SongBadge />}
            <Text fontSize={24} mr={4}>
              {song.name}
            </Text>
            <MVLink mvID={song.mv} variant="detail" />
          </Flex>

          <SongLink>
            歌手：
            <UserLink users={song.ar} space color="#0c73c2" />
          </SongLink>
          <SongLink>
            所属专辑：
            <TextNavLink to={routeBuilder.album(song.al.id)} color="#0c73c2">
              {song.al.name}
            </TextNavLink>
          </SongLink>

          <Box mb={38}>
            <MediaOperationBar
              isVIP={isVIPTrack(song)}
              callbacks={{
                onPlayClick: () => playTrack(song),
                onAddClick: () => addToPlaylist(song),
              }}
            />
          </Box>

          {/* 歌词显示部分 */}
          <ExpandableParagraph
            ref={lyricRef}
            maxLines={13}
            expandPosition="left"
            ellipsis={false}
            onExpand={onExpandChange}
            lineHeight={23}
            color="#333"
          >
            {lyrics}
          </ExpandableParagraph>
        </Box>
      </SongDetailWrapper>
    </>
  )
}
