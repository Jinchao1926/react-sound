import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { RadioDetail } from './RadioDetail'
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
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
