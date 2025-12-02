import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { ProgramDetail } from './ProgramDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Program: FC = () => {
  const { id: programId } = useQueryParamId()

  if (!programId) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <ProgramDetail programId={programId} />
      </DetailLeftContent>
      <DetailRightContent>
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
