import { FC } from 'react'

import { useProgramDetailQuery } from '@/hooks/program/useProgramDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { ProgramDetail } from './components/ProgramDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Program: FC = () => {
  const { id: programId } = useQueryParamId()
  const { data } = useProgramDetailQuery(programId)

  if (!programId || !data) return null

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
