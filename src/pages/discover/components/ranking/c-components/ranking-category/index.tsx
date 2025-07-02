import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import classNames from 'classnames'
import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { RankingCategoryWrapper } from './style'
import {
  changeRankingFrequencyAction,
  fetchRankingDetailAsync,
} from '../../store'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

interface IProps {
  children?: ReactNode
  initRankingId: number | null
}

const RankingCategory: FC<IProps> = (props: IProps) => {
  const { initRankingId } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  // redux
  const { topList } = useAppSelector(
    (state) => ({
      topList: state.ranking.topList,
    }),
    shallowEqual
  )

  // select style
  useEffect(() => {
    if (initRankingId === null) {
      setSelectedIndex(0)
      return
    }

    let idx = topList.findIndex((item) => item.id === initRankingId)
    if (idx === -1) idx = 0
    setSelectedIndex(idx)
  }, [topList, initRankingId])

  // Fetch ranking detail
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (selectedIndex < topList.length) {
      const item = topList[selectedIndex]
      dispatch(fetchRankingDetailAsync(item.id))
      dispatch(changeRankingFrequencyAction(item.updateFrequency))
    }
  }, [dispatch, topList, selectedIndex])

  return (
    <RankingCategoryWrapper>
      {topList.map((item, idx) => {
        let header
        if (idx === 0 || idx === 4) {
          header =
            idx === 0 ? (
              <h2 className="header1">云音乐特色榜</h2>
            ) : (
              <h2 className="header2">全球媒体榜</h2>
            )
        }
        return (
          <React.Fragment key={item.id}>
            {header}
            <NavLink
              className={classNames('category', {
                selected: selectedIndex === idx,
              })}
              to={`/discover/ranking?id=${item.id}`}
            >
              <div className="content">
                <img src={formatSizedImage(item.coverImgUrl, 40)} alt="" />
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="frequency">{item.updateFrequency}</p>
                </div>
              </div>
            </NavLink>
          </React.Fragment>
        )
      })}
    </RankingCategoryWrapper>
  )
}

export default memo(RankingCategory)
