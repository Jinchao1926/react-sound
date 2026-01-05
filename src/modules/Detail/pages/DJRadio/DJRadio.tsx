import { type FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { RadioDetail } from './RadioDetail'
import { RecommendedRadios } from './RecommendedRadios'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const DJRadio: FC = () => {
  const { id: radioId } = useQueryParamId()

  if (!radioId) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <RadioDetail radioId={radioId} />
      </DetailLeftContent>
      <DetailRightContent>
        <RecommendedRadios />
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
