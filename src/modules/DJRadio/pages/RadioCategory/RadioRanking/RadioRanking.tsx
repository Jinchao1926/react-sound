import React, { FC, useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import JCPagination from '@/components/Paginations'
import { SectionHeader } from '@/components/SectionHeader'
import { useTopRadiosQuery } from '@/hooks/djradio/useTopRadiosQuery'
import { formatSizedImage } from '@/utils/format-utils'

import { RadioRankingWrapper, RadioItemWrapper } from './RadioRanking.styles'

const PAGE_SIZE = 30

export const RadioRanking: FC<{ id: number }> = ({ id }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    setCurrentPage(1)
  }, [id])

  const { data: radios, count } = useTopRadiosQuery({
    cateId: id,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  return (
    <RadioRankingWrapper>
      <SectionHeader title="电台排行榜" />
      <div className="radio-list">
        {radios.map((item) => (
          <RadioItemWrapper key={item.id}>
            <NavLink className="left" to={`/djradio?id=${item.id}`}>
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
        ))}
      </div>
      <JCPagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </RadioRankingWrapper>
  )
}
