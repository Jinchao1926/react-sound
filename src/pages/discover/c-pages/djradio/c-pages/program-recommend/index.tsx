import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { ProgramRecommendWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode;
  simpleVersion?: boolean;
}

const ProgramRecommend: FC<IProps> = (props: IProps) => {
  const { simpleVersion = false } = props
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const [morePath, setMorePath] = useState<string | undefined>()

  // Custom Header
  useEffect(() => {
    setSubTitle(simpleVersion ? undefined : '（每日更新）')
    setMorePath(simpleVersion ? '/discover/djradio/recommend' : undefined)
  }, [simpleVersion])

  return (
    <ProgramRecommendWrapper className='program-recommend'>
      <SectionHeaderNormal 
        title='推荐节目' 
        subTitle={subTitle}
        morePath={morePath} 
      />
    </ProgramRecommendWrapper>
  )
}

export default memo(ProgramRecommend)