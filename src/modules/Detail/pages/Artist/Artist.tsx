import { type FC, Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { ArtistHeader } from './components/ArtistHeader'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const Artist: FC = () => {
  const { id: artistId } = useQueryParamId()

  if (!artistId) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <ArtistHeader artistId={artistId} />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </DetailLeftContent>
      <DetailRightContent>
        <MultiDownload />
        <UserWiki id={artistId} type="artist" />
      </DetailRightContent>
    </DetailWrapper>
  )
}
