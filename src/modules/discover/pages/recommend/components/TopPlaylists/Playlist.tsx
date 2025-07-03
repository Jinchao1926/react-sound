import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { addSongToPlaylistAction, playSongAction } from '@/modules/Player/store'
import { useAppDispatch } from '@/store'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/format-utils'

import {
  PlaylistFooterWrapper,
  PlaylistHeaderWrapper,
  PlaylistSongListWrapper,
  PlaylistWrapper,
} from './Playlist.styles'

interface PlaylistProps {
  playlist: PlaylistDetail
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const { tracks = [] } = playlist

  const rankingUrl = `/discover/toplist?id=${playlist.id}`
  const dispatch = useAppDispatch()

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
    <PlaylistWrapper>
      <PlaylistHeaderWrapper>
        <div className="cover">
          <img
            src={formatSizedImage(playlist.coverImgUrl, 80)}
            alt={playlist.name}
          />
          <NavLink className="sprite_cover" to={rankingUrl} />
        </div>
        <div className="info">
          <NavLink to={rankingUrl}>
            <h3>{playlist.name}</h3>
          </NavLink>
          <div className="actions">
            <button className="sprite_02 btn play" title="播放" />
            <button className="sprite_02 btn collect" title="收藏" />
          </div>
        </div>
      </PlaylistHeaderWrapper>
      <PlaylistSongListWrapper>
        {tracks.slice(0, 10).map((song, index) => {
          return (
            <div className="item" key={song.id}>
              <span className="index">{index + 1}</span>
              <NavLink className="name no-wrap" to={`/song?id=${song.id}`}>
                {song.name}
              </NavLink>
              <div className="actions">
                <button
                  className="sprite_02 btn play"
                  title="播放"
                  onClick={() => playMusic(song)}
                />
                <button
                  className="sprite_icon2 btn addTo"
                  title="添加到播放列表"
                  onClick={() => addMusicToPlaylist(song)}
                />
                <button
                  className="sprite_02 btn collect"
                  title="收藏"
                  onClick={() => collectMusic(song)}
                />
              </div>
            </div>
          )
        })}
      </PlaylistSongListWrapper>
      <PlaylistFooterWrapper>
        <NavLink to={rankingUrl}>{'查看全部>'}</NavLink>
      </PlaylistFooterWrapper>
    </PlaylistWrapper>
  )
}
