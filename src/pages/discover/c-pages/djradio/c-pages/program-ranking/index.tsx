import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { ProgramRankingWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'

interface IProps {
  children?: ReactNode;
  simpleVersion?: boolean;
}

const ProgramRanking: FC<IProps> = (props: IProps) => {
  const { simpleVersion = false } = props
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const [morePath, setMorePath] = useState<string | undefined>()

  // Custom Header
  useEffect(() => {
    setSubTitle(simpleVersion ? undefined : '（每日更新）')
    setMorePath(simpleVersion ? '/discover/djradio/ranking' : undefined)
  }, [simpleVersion])

  return (
    <ProgramRankingWrapper className='program-ranking'>
      <SectionHeaderNormal 
        title='节目排行榜' 
        subTitle={subTitle}
        morePath={morePath} 
      />
    </ProgramRankingWrapper>
  )
}

export default memo(ProgramRanking)