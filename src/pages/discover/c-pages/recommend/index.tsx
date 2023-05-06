import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

// Store
import { useAppDispatch } from '@/store'
import { 
  fetchRecommendDataAsync 
} from './store'

// UIs
import { 
  RecommendWrapper,
  RecommendSection,
  RecommendLeft,
  RecommendRight
} from './style'
import Banner from './c-components/banner'
import JCBanner from './c-components/jc-banner'
import UserProfile from './c-components/user-profile'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAsync())
  }, [])

  return (
    <RecommendWrapper>
      <Banner />
      {/* <JCBanner /> */}
      <RecommendSection className="wrap-v2">
        {/* <RecommendLeft>

        </RecommendLeft> */}
        {/* <RecommendRight> */}
          {/* <UserProfile /> */}
        {/* </RecommendRight> */}
      </RecommendSection>
    </RecommendWrapper>
  )
}

export default memo(Recommend)