import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import SongOperationBar from '@/components/SongOperationBar'
import { UserLink } from '@/components/UserLink'
import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { formatSizedImage } from '@/utils/format-utils'

import { LyricList, SongDetailWrapper, SongRecord } from './SongDetail.styles'

const INITIAL_LYRIC_COUNT = 13

export const SongDetail: FC<{ songId: number }> = ({ songId }) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)
  const lyricRef = useRef<HTMLDivElement>(null)

  const { data: song } = useSongDetailQuery(songId)
  const { data: lyric } = useSongLyricQuery(songId)

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

  // Player Context
  const { playSong } = usePlayerContext()

  const addMusicToPlaylist = useCallback(() => {
    if (!song) return
    // 当前的 PlayerProvider 还没有实现 addSongToPlaylist 功能
    // 后续可以添加这个功能
    // eslint-disable-next-line no-console
    console.warn('添加到播放列表功能暂未实现')
  }, [song])
  // ========== Music Handlers End ==========

  if (!song) return null

  return (
    <SongDetailWrapper>
      <SongRecord>
        <div className="cover">
          <img src={formatSizedImage(song.al.picUrl, 130)} alt={song.name} />
          <span className="record sprite_cover" />
        </div>
        <div className="link">
          <span className="icon sprite_icon2" />
          <a href="/#" onClick={(e) => e.preventDefault()}>
            生成外链播放器
          </a>
        </div>
      </SongRecord>
      <LyricList>
        <div className="header">
          <span className="icon sprite_icon2" />
          <span>{song.name}</span>
        </div>
        <div className="singer">
          歌手：
          <UserLink users={song.ar} showSpace={true} />
        </div>
        <div className="album">
          所属专辑：
          <NavLink to={`/album?id=${song.al.id}`}>{song.al.name}</NavLink>
        </div>
        <SongOperationBar
          callbacks={{
            onPlayClick: () => playSong(songId),
            onAddClick: addMusicToPlaylist,
          }}
        />
        {/* 歌词显示部分 */}
        <span className="lyric-content" ref={lyricRef}>
          {lyricString}
        </span>
        {lyric.length > INITIAL_LYRIC_COUNT && (
          <div
            className="lyric-control"
            onClick={() => setShowingMore((prev) => !prev)}
          >
            {showingMore ? '收起' : '展开'}
            <span
              className={classNames('sprite_icon2 icon', {
                collapse: showingMore,
                expand: !showingMore,
              })}
            />
          </div>
        )}
      </LyricList>
    </SongDetailWrapper>
  )
}
