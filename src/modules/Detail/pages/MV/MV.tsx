import { type FC } from 'react'

import { useMVDetailQuery } from '@/hooks/mv/useMVDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { MVDetail } from './MVDetail'
import { MVIntroduction } from './MVIntroduction'
import { WechatQRCode } from './WechatQRCode'
import { DetailDataWrapper } from '../../components/DetailDataWrapper'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const MV: FC = () => {
  const { id: mvId } = useQueryParamId()
  const { data: mv, isLoading, isError } = useMVDetailQuery(mvId)

  if (!mv) return null

  return (
    <DetailDataWrapper data={mv} isLoading={isLoading} isError={isError}>
      <DetailWrapper>
        <DetailLeftContent>
          <MVDetail mv={mv} />
        </DetailLeftContent>
        <DetailRightContent>
          <MVIntroduction mv={mv} />
          <MultiDownload />
          <WechatQRCode />
          <UserWiki id={mv.id} type="mv" />
        </DetailRightContent>
      </DetailWrapper>
    </DetailDataWrapper>
  )
}
