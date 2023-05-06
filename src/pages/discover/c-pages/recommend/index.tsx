import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

// Store
import { useAppDispatch } from '@/store'
import { 
  fetchRecommendDataAsync 
} from './store'

// UIs
import { 
  RecommendWrapper 
} from './style'
import Banner from './c-components/Banner'
// import JCBanner from './c-components/JCBanner'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log("Recommend")
    dispatch(fetchRecommendDataAsync())
  }, [])

  return (
    <RecommendWrapper>
      <Banner />
      {/* <JCBanner /> */}
      <div>Recommend</div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)