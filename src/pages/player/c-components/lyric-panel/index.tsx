import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import classNames from 'classnames'

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
  // redux
  const { currentSong, currentLyric } = useAppSelector(state => ({
      currentSong: state.player.currentSong,
      currentLyric: state.player.currentLyric,
    }), 
    shallowEqual
  )

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
          <button className='play sprite_button'>播放</button>
          <button className='add sprite_button'></button>
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
        <span className='lyric-content'>{lyricString}</span>
        <div className='lyric-control' onClick={e => handleShowingMore()}>
          {showingMore ? '收起' : '展开'}
          <span className={classNames('sprite_icon2 icon', {collapse: showingMore, expand: !showingMore})}/>
        </div>
      </LyricList>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)