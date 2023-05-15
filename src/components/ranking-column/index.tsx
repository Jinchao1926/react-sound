import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { formatSizedImage } from '@/utils/format-utils'

import { 
  RankingColumnWrapper, 
  RankingColumnHeaderWrapper,
  RankingColumnListWrapper,
  RankingColumnFootererWrapper
} from './style'

interface IProps {
  children?: ReactNode,
  info: any
}

const RankingColumn: FC<IProps> = (props: IProps) => {
  const { info } = props
  const { tracks = [] } = info

  const rankingUrl = `/discover/ranking?id=${info.id}`

  return (
    <RankingColumnWrapper>
      <RankingColumnHeaderWrapper>
        <div className='cover'>
          <img src={formatSizedImage(info.coverImgUrl, 80)} alt={info.name}/>
          <a className='sprite_cover' href={rankingUrl}> </a>
        </div>
        <div className='info'>
          <a href={rankingUrl}>
            <h3>{info.name}</h3>
          </a>
          <div className='actions'>
            <a className='sprite_02 btn play' href='/#' title='播放'> </a>
            <a className='sprite_02 btn collect' href='/#' title='收藏'> </a>
          </div>
        </div>
      </RankingColumnHeaderWrapper>
      <RankingColumnListWrapper>
        {
          tracks.slice(0, 10).map((item: any, index: number) => {
            return (
              <div className='item' key={item.id}>
                <span className='index'>{index + 1}</span>
                <span className='name'>{item.name}</span>
                <div className='actions'>
                  <a className='sprite_02 btn play' href='/#' title='播放'> </a>
                  <a className='sprite_icon2 btn addTo' href='/#' title='添加到播放列表'> </a>
                  <a className='sprite_02 btn collect' href='/#' title='收藏'> </a>
                </div>
              </div>
            )
          })
        }
      </RankingColumnListWrapper>
      <RankingColumnFootererWrapper>
        <a href={rankingUrl}>查看全部</a>
      </RankingColumnFootererWrapper>
    </RankingColumnWrapper>
  )
}

export default memo(RankingColumn)