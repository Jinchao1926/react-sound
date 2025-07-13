import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { UserLink } from '@/components/UserLink'
import { PlaylistDetail } from '@/types/playlist'
import { formatMinuteSecond, formatSizedImage } from '@/utils/format-utils'

import {
  ToplistDetailWrapper,
  ToplistTracksTable,
} from './ToplistDetail.styles'

export const ToplistDetail: FC<{ playlist: PlaylistDetail }> = ({
  playlist,
}) => {
  return (
    <ToplistDetailWrapper>
      <div className="section-header">
        <div>
          <span className="title">歌曲列表</span>
          <span className="track-count">{playlist.trackCount}首歌</span>
        </div>
        <div>
          播放：
          <strong className="play-count">{playlist.playCount}</strong>次
        </div>
      </div>
      <ToplistTracksTable>
        <table>
          <thead className="sprite_table">
            <tr>
              <th className="ranking"></th>
              <th className="title">标题</th>
              <th className="duration">时长</th>
              <th className="singer">歌手</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks?.map((item, idx) => {
              return (
                <tr key={item.id}>
                  {/* ranking */}
                  <td>
                    <div className="ranking-num">
                      <span className="num">{idx + 1}</span>
                      <div className="trend">
                        <span className="new sprite_icon2"></span>
                      </div>
                    </div>
                  </td>
                  {/* song */}
                  <td>
                    <div className="song-name">
                      {
                        // 前三行显示 Image
                        idx < 3 ? (
                          <NavLink to={`/song?id=${item.id}`}>
                            <img
                              src={formatSizedImage(item.al.picUrl, 50)}
                              alt=""
                            />
                          </NavLink>
                        ) : null
                      }
                      <span className="play sprite_table"></span>
                      <NavLink
                        className="name no-wrap"
                        to={`/song?id=${item.id}`}
                      >
                        {item.name}
                      </NavLink>
                      {
                        // 别名
                        ((item.tns && item.tns.length > 0) ||
                          item.alia.length > 0) && (
                          <span className="alias no-wrap">
                            &nbsp;-&nbsp;(
                            {(item.tns && item.tns.length > 0 && item.tns[0]) ||
                              item.alia[0]}
                            )
                          </span>
                        )
                      }
                      {
                        // MV
                        item.mv !== 0 && (
                          <NavLink to={`/mv?id=${item.mv}`} title="播放mv">
                            <span className="mv sprite_table" />
                          </NavLink>
                        )
                      }
                    </div>
                  </td>
                  {/* duration & action */}
                  <td className="duration-item">
                    <span className="duration">
                      {formatMinuteSecond(item.dt)}
                    </span>
                    <div className="actions">
                      <div
                        className="sprite_icon2 btn addTo"
                        title="添加到播放列表"
                      />
                      <div className="sprite_02 btn collect" title="收藏" />
                      <div className="sprite_table btn share" title="分享" />
                      <div className="sprite_table btn download" title="下载" />
                    </div>
                  </td>
                  {/* singer */}
                  <td>
                    <UserLink users={item.ar} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </ToplistTracksTable>
    </ToplistDetailWrapper>
  )
}
