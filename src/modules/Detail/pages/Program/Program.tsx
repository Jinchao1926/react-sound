import { type FC } from 'react'

import { useProgramDetailQuery } from '@/hooks/program/useProgramDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { MorePrograms } from './MorePrograms'
import { ProgramDetail } from './ProgramDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Program: FC = () => {
  const { id: programId } = useQueryParamId()
  const { data: program } = useProgramDetailQuery(programId)

  if (!programId || !program) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <ProgramDetail programId={programId} />
      </DetailLeftContent>
      <DetailRightContent>
        <MorePrograms radioId={program.radio.id} />
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
