import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import { formatSizedImage } from '@/utils/format-utils'
import classNames from 'classnames'

import { RankingCategoryWrapper } from './style'


interface IProps {
  children?: ReactNode,
  initRankingId: number | null
}

const RankingCategory: FC<IProps> = (props: IProps) => {
  const { initRankingId } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  // redux
  const { topList } = useAppSelector(
    (state) => ({
      topList: state.ranking.topList
    }), 
    shallowEqual
  )

  useEffect(() => {
    if (initRankingId == null) {
      setSelectedIndex(0)
      return
    }

    let idx = topList.findIndex( item => item.id === initRankingId )
    if (idx === -1) idx = 0
    setSelectedIndex(idx)
  }, [topList, initRankingId])

  return (
    <RankingCategoryWrapper>
      {
        topList.map((item, idx) => {
          let header;
          if (idx === 0 || idx === 4) {
            header = (idx === 0) ? 
                     <h2 className='header1'>云音乐特色榜</h2> : 
                     <h2 className='header2'>全球媒体榜</h2>
          }
          return (
            <React.Fragment key={item.id}>
              { header }
              <NavLink 
                className={classNames('category', { selected: selectedIndex === idx })}
                to= {`/discover/ranking?id=${item.id}`}
                >
                <div className='content'>
                  <img src={formatSizedImage(item.coverImgUrl, 40)} alt=""/>
                  <div className="info">
                    <p className='name'>{item.name}</p>
                    <p className='frequency'>{item.updateFrequency}</p>
                  </div>
                </div>
              </NavLink>
            </React.Fragment>
          )
        })
      }
    </RankingCategoryWrapper>
  )
}

export default memo(RankingCategory)