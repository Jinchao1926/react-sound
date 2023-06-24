import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { fetchRankingDatasAsync } from './store'
import { useAppDispatch } from '@/store'

import { 
  RankingWrapper,
  RankingLeft,
  RankingRight
} from './style'
import RankingCategory from './c-components/ranking-category'
import RankingHeader from './c-components/ranking-header'
// import SongList from ''

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const rankingId = queryParams.get('id')

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRankingDatasAsync())
  }, [dispatch])

  return (
    <RankingWrapper className='wrap-v2'>
      <RankingLeft>
        <RankingCategory initRankingId={Number(rankingId)}/>
      </RankingLeft>
      <RankingRight>
        <RankingHeader />
      </RankingRight>
    </RankingWrapper>
  )
}

export default memo(Ranking)