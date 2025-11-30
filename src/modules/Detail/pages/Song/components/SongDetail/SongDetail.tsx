import { FC, useMemo, useRef } from 'react'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { ExternalLink, UserLink } from '@/components/Links'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { SongBadge } from '@/components/Shared/Badge'
import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

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
  const { playSong, addToPlaylist } = usePlayerContext()

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

  return (
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
        <Flex align="center" gap={10} pb={8}>
          <SongBadge />
          <Text fontSize={24}>{song.name}</Text>
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
            callbacks={{
              onPlayClick: () => playSong(song),
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
  )
}
