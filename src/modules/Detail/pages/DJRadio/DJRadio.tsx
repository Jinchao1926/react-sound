import { type FC } from 'react'

import { useRadioDetailQuery } from '@/hooks/djradio/useRadioDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { RadioDetail } from './RadioDetail'
import { RecommendedRadios } from './RecommendedRadios'
import { DetailDataWrapper } from '../../components/DetailDataWrapper'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const DJRadio: FC = () => {
  const { id: radioId } = useQueryParamId()
  const { data: radio, isLoading, isError } = useRadioDetailQuery(radioId)

  if (!radioId) return null

  return (
    <DetailDataWrapper data={radio} isLoading={isLoading} isError={isError}>
      <DetailWrapper>
        <DetailLeftContent>
          <RadioDetail radioId={radioId} />
        </DetailLeftContent>
        <DetailRightContent>
          <RecommendedRadios />
          <MultiDownload />
        </DetailRightContent>
      </DetailWrapper>
    </DetailDataWrapper>
  )
}
