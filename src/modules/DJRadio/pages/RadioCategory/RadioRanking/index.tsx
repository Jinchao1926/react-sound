import React, { memo, useState, useEffect, useCallback } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import JCPagination from '@/components/Pagination'
import { SectionHeader } from '@/components/SectionHeader'
import { useAppSelector, useAppDispatch } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import { RadioRankingWrapper, RadioItemWrapper } from './style'
import { fetchHotRadiosAsync } from '../../../store'

interface IProps {
  children?: ReactNode
  categoryId: number
}

const RadioRanking: FC<IProps> = (props: IProps) => {
  const { categoryId } = props
  // state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [radios, setRadios] = useState<any[]>([])
  // redux
  const { pageRadios, total } = useAppSelector(
    (state) => ({
      pageRadios: state.radio.pageHotRadios,
      total: state.radio.hotTotal,
    }),
    shallowEqual
  )

  // 切换分类时，重置当前页码
  useEffect(() => {
    setCurrentPage(1)
  }, [categoryId])
  // 切换页码时，更新当前页的新碟
  useEffect(() => {
    setRadios(pageRadios[currentPage - 1] || [])
  }, [pageRadios, currentPage])

  // handles
  const dispatch = useAppDispatch()
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)

      dispatch(fetchHotRadiosAsync({ categoryId: categoryId, page: page - 1 }))
    },
    [dispatch, categoryId]
  )

  return (
    <RadioRankingWrapper>
      <SectionHeader title="电台排行榜" />
      <div className="radio-list">
        {radios.map((item) => {
          return (
            <RadioItemWrapper key={item.id}>
              <NavLink className="left" to={`/discover/radio?id=${item.id}`}>
                <img src={formatSizedImage(item.picUrl, 120)} alt="" />
              </NavLink>
              <div className="right">
                <h3 className="name">{item.name}</h3>
                <div className="dj">
                  <i className="sprite_icon2 dj-icon" />
                  <NavLink
                    className="user-name"
                    to={`/user/home?=${item.dj.userId}`}
                  >
                    {item.dj.nickname}
                  </NavLink>
                  {item.dj.avatarDetail && (
                    <img
                      className="vip"
                      src={item.dj.avatarDetail.identityIconUrl}
                      alt=""
                    />
                  )}
                </div>
                <p className="desc">
                  {`共${item.programCount}期`} {`订阅${item.subCount}次`}
                </p>
              </div>
            </RadioItemWrapper>
          )
        })}
      </div>
      <JCPagination
        current={currentPage}
        pageSize={30}
        total={total}
        onPageChange={handlePageChange}
      />
    </RadioRankingWrapper>
  )
}

export default memo(RadioRanking)
