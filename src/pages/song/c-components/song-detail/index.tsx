import type { FC, ReactNode } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import SongOperationBar from '@/components/song-operation-bar'
import UserLink from '@/components/user-link'
import { addSongToPlaylistAction, playSongAction } from '@/pages/player/store'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import { LyricList, SongDetailWrapper, SongRecord } from './style'

interface IProps {
  children?: ReactNode
}

const SongDetail: FC<IProps> = () => {
  // state
  const [lyricString, setLyricString] = useState<string>('')
  const [showingMore, setShowingMore] = useState<boolean>(false)
  const lyricRef = useRef<HTMLDivElement>(null)
  // redux
  const { song, lyric } = useAppSelector(
    (state) => ({
      song: state.song.song,
      lyric: state.song.lyric,
    }),
    shallowEqual
  )

  // 显示不同长度的歌词
  useEffect(() => {
    if (!lyric) {
      setLyricString('')
      return
    }
    let lyricContents = lyric.map((item: { text: string }) => item.text)
    if (!showingMore) {
      lyricContents = lyricContents.slice(0, 13)
    }
    const newLyricString = lyricContents.join('\n')
    setLyricString(newLyricString)
  }, [lyric, showingMore])

  // 处理 展开/收起 按钮的位置
  useEffect(() => {
    if (!lyricRef.current) return
    const scrollY = window.scrollY
    const rect = lyricRef.current!.getBoundingClientRect()

    setTimeout(() => {
      const newRect = lyricRef.current!.getBoundingClientRect()
      const y = scrollY + newRect.height - rect.height
      window.scrollTo(window.scrollX, y)
    }, 0)
  }, [showingMore])

  // ========== Music Handlers ==========
  const dispatch = useAppDispatch()
  const playMusic = useCallback(() => {
    dispatch(playSongAction(song.id))
  }, [song, dispatch])

  const addMusicToPlaylist = useCallback(() => {
    dispatch(addSongToPlaylistAction(song))
  }, [song, dispatch])
  // ========== Music Handlers End ==========

  // handles
  function handleShowingMore() {
    setShowingMore(!showingMore)
  }

  return (
    <SongDetailWrapper>
      <SongRecord>
        <div className="cover">
          <img src={formatSizedImage(song?.al.picUrl, 130)} alt="" />
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
          <span>{song?.name}</span>
        </div>
        <p className="singer">
          歌手：
          {song?.ar && <UserLink users={song?.ar} showSpace={true} />}
        </p>
        <p className="album">
          所属专辑：
          <NavLink to={`/albumn?id=${song?.al.id}`}>{song?.al.name}</NavLink>
        </p>
        <SongOperationBar
          callbacks={{
            onPlayClick: playMusic,
            onAddClick: addMusicToPlaylist,
          }}
        />
        <span className="lyric-content" ref={lyricRef}>
          {lyricString}
        </span>
        <div className="lyric-control" onClick={() => handleShowingMore()}>
          {showingMore ? '收起' : '展开'}
          <span
            className={classNames('sprite_icon2 icon', {
              collapse: showingMore,
              expand: !showingMore,
            })}
          />
        </div>
      </LyricList>
    </SongDetailWrapper>
  )
}

export default memo(SongDetail)
