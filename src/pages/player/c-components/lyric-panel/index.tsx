import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { 
  fetchSongDetailAsync,
  addSongToPlaylistAction,
  switchIsPlayingAction,
} from '@/pages/player/store'

import { formatSizedImage } from '@/utils/format-utils'

import { 
  LyricPanelWrapper,
  SongRecord,
  LyricList,
  SongAction,
} from './style'

interface IProps {
  children?: ReactNode
}

const LyricPanel: FC<IProps> = () => {
  // state
  const [lyricString, setLyricString] = useState<string>('')
  const [showingMore, setShowingMore] = useState<boolean>(false)
  const lyricRef = useRef<HTMLDivElement>(null)
  // redux
  const { currentSong, currentLyric } = useAppSelector(state => ({
      currentSong: state.player.currentSong,
      currentLyric: state.player.currentLyric,
    }), 
    shallowEqual
  )

  // 显示不同长度的歌词
  useEffect(() => {
    if (!currentLyric) {
      setLyricString('')
      return
    }
    let lyricContents = currentLyric.map((item: {text: string}) => item.text)
    if (!showingMore) {
      lyricContents = lyricContents.slice(0, 13)
    }
    const newLyricString = lyricContents.join('\n')
    setLyricString(newLyricString)
  }, [currentLyric, showingMore])

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
    dispatch(fetchSongDetailAsync(currentSong.id))
    dispatch(switchIsPlayingAction(true))
  }, [currentSong, dispatch])

  const addMusicToPlaylist = useCallback(() => {
    dispatch(addSongToPlaylistAction(currentSong))
  }, [currentSong, dispatch])
  // ========== Music Handlers End ==========

  // handles
  function handleShowingMore() {
    setShowingMore(!showingMore)
  }

  return (
    <LyricPanelWrapper>
      <SongRecord>
        <div className='cover'>
          <img src={formatSizedImage(currentSong?.al.picUrl, 130)} alt=''/>
          <span className='record sprite_cover' />
        </div>
        <div className='link'>
          <span className='icon sprite_icon2' />
          <a href='/#' onClick={e => e.preventDefault()}>生成外链播放器</a>
        </div>
      </SongRecord>
      <LyricList>
        <div className='header'>
          <span className='icon sprite_icon2' />
          <span>{currentSong?.name}</span>
        </div>
        <p className='singer'>
          歌手：
          {
            currentSong?.ar.map((item: {id: string, name: string}, index: number) => {
              return (
                <React.Fragment key={item.id}>
                  { index > 0 && ' / '}
                  <NavLink to={`/artist?id=${item.id}`}>{item.name}</NavLink> 
                </React.Fragment>
              )
            })
          }
        </p>
        <p className='album'>
          所属专辑：
          <NavLink to={`/albumn?id=${currentSong?.al.id}`}>{currentSong?.al.name}</NavLink> 
        </p>
        <SongAction>
          <button className='play sprite_button' onClick={playMusic}>播放</button>
          <button className='add sprite_button' onClick={addMusicToPlaylist}></button>
          <button className='collect sprite_button' >
            <span className='sprite_button'>收藏</span>
          </button>
          <button className='share sprite_button' >
            <span className='sprite_button'>分享</span>
          </button>
          <button className='download sprite_button' >
            <span className='sprite_button'>下载</span>
          </button>
          <button className='review sprite_button' >
            <span className='sprite_button'>评论</span>
          </button>
        </SongAction>
        <span className='lyric-content' ref={lyricRef}>{lyricString}</span>
        <div className='lyric-control' onClick={e => handleShowingMore()}>
          {showingMore ? '收起' : '展开'}
          <span className={classNames('sprite_icon2 icon', {collapse: showingMore, expand: !showingMore})}/>
        </div>
      </LyricList>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)