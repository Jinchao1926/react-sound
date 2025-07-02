import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { NavLink } from 'react-router-dom'

import { addSongToPlaylistAction, playSongAction } from '@/pages/player/store'
import { useAppDispatch } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import {
  RankingColumnFootererWrapper,
  RankingColumnHeaderWrapper,
  RankingColumnListWrapper,
  RankingColumnWrapper,
} from './style'

interface IProps {
  children?: ReactNode
  info: any
}

const RankingColumn: FC<IProps> = (props: IProps) => {
  const { info } = props
  const { tracks = [] } = info

  const rankingUrl = `/discover/ranking?id=${info.id}`
  const dispatch = useAppDispatch()

  // Playlist music handlers

  // Music handlers
  const playMusic = (item: any) => {
    dispatch(playSongAction(item.id))
  }
  const addMusicToPlaylist = (item: any) => {
    dispatch(addSongToPlaylistAction(item))
  }
  // eslint-disable-next-line no-unused-vars
  const collectMusic = (item: any) => {}

  return (
    <RankingColumnWrapper>
      <RankingColumnHeaderWrapper>
        <div className="cover">
          <img src={formatSizedImage(info.coverImgUrl, 80)} alt={info.name} />
          <NavLink className="sprite_cover" to={rankingUrl} />
        </div>
        <div className="info">
          <NavLink to={rankingUrl}>
            <h3>{info.name}</h3>
          </NavLink>
          <div className="actions">
            <button className="sprite_02 btn play" title="播放">
              {' '}
            </button>
            <button className="sprite_02 btn collect" title="收藏">
              {' '}
            </button>
          </div>
        </div>
      </RankingColumnHeaderWrapper>
      <RankingColumnListWrapper>
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <span className="index">{index + 1}</span>
              <NavLink
                className="name no-wrap"
                to={`/discover/song?id=${item.id}`}
              >
                {item.name}
              </NavLink>
              <div className="actions">
                <button
                  className="sprite_02 btn play"
                  title="播放"
                  onClick={() => playMusic(item)}
                />
                <button
                  className="sprite_icon2 btn addTo"
                  title="添加到播放列表"
                  onClick={() => addMusicToPlaylist(item)}
                />
                <button
                  className="sprite_02 btn collect"
                  title="收藏"
                  onClick={() => collectMusic(item)}
                />
              </div>
            </div>
          )
        })}
      </RankingColumnListWrapper>
      <RankingColumnFootererWrapper>
        <NavLink to={rankingUrl}>查看全部</NavLink>
      </RankingColumnFootererWrapper>
    </RankingColumnWrapper>
  )
}

export default memo(RankingColumn)
