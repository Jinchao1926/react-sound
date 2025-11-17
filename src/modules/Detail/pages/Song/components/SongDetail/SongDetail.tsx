import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { MediaOperationBar } from '@/components/MediaOperationBar'
import { SingleBadge } from '@/components/Shared/Logo'
import { Box, Flex, Image, Text, TextNavLink } from '@/components/UI'
import { UserLink } from '@/components/UserLink'
import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  ExpandButton,
  ExpandIcon,
  LyricList,
  MusicIcon,
  MusicLink,
  OpenClientButton,
  SongCD,
  SongCDCover,
  SongDetailWrapper,
  SongLink,
} from './SongDetail.styles'

const INITIAL_LYRIC_COUNT = 13

export const SongDetail: FC<{ songId: number }> = ({ songId }) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)
  const lyricRef = useRef<HTMLDivElement>(null)

  const { data: song } = useSongDetailQuery(songId)
  const { data: lyric } = useSongLyricQuery(songId)
  const { playSong, addToPlaylist } = usePlayerContext()

  const lyricString = useMemo(() => {
    if (!lyric.length) {
      return ''
    }

    let lyricContents = lyric.map((item) => item.text)
    if (!showingMore) {
      lyricContents = lyricContents.slice(0, INITIAL_LYRIC_COUNT)
    }
    return lyricContents.join('\n')
  }, [lyric, showingMore])

  // 处理展开/收起时的滚动位置
  useEffect(() => {
    if (!lyricRef.current) return
    const scrollY = window.scrollY
    const rect = lyricRef.current.getBoundingClientRect()

    const timeoutId = setTimeout(() => {
      if (!lyricRef.current) return
      const newRect = lyricRef.current.getBoundingClientRect()
      const y = scrollY + newRect.height - rect.height
      window.scrollTo(window.scrollX, y)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [showingMore])

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
        <Flex align="center" mt={20} ml={46}>
          <MusicIcon />
          <MusicLink
            href={`https://music.163.com/#/outchain/2/${song.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            生成外链播放器
          </MusicLink>
        </Flex>
        <OpenClientButton>点击打开客户端</OpenClientButton>
      </Box>

      <Box width={414}>
        <Flex align="center" gap={10} pb={8}>
          <SingleBadge />
          <Text fontSize={24}>{song.name}</Text>
        </Flex>

        <SongLink>
          歌手：
          <UserLink users={song.ar} space color="#0c73c2" />
        </SongLink>
        <SongLink>
          所属专辑：
          <TextNavLink to={`/album?id=${song.al.id}`} color="#0c73c2">
            {song.al.name}
          </TextNavLink>
        </SongLink>

        <MediaOperationBar
          callbacks={{
            onPlayClick: () => playSong(song),
            onAddClick: () => addToPlaylist(song),
          }}
        />

        {/* 歌词显示部分 */}
        <LyricList ref={lyricRef}>{lyricString}</LyricList>
        {lyric.length > INITIAL_LYRIC_COUNT && (
          <ExpandButton onClick={() => setShowingMore((prev) => !prev)}>
            {showingMore ? '收起' : '展开'}
            <ExpandIcon expanded={!showingMore} />
          </ExpandButton>
        )}
      </Box>
    </SongDetailWrapper>
  )
}
