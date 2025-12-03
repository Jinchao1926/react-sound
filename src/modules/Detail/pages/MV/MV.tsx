import { FC } from 'react'

import { useMVDetailQuery } from '@/hooks/mv/useMVDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { MVDetail } from './MVDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const MV: FC = () => {
  const { id: mvId } = useQueryParamId()
  const { data: mv } = useMVDetailQuery(mvId)

  if (!mv) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <MVDetail mv={mv} />
      </DetailLeftContent>
      <DetailRightContent>
        <MultiDownload />
        <UserWiki id={123} type="song" />
      </DetailRightContent>
    </DetailWrapper>
  )
}
