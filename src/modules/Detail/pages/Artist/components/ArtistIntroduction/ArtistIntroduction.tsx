import { Fragment, type FC } from 'react'

import { Box } from '@/components/Core'
import { useArtistIntroductionQuery } from '@/hooks/artist/useArtistIntroductionQuery'
import { useArtistQuery } from '@/hooks/artist/useArtistsQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import {
  BriefIcon,
  BriefIntroduction,
  BriefTitle,
  HeaderTitle,
  IntroductionText,
} from './ArtistIntroduction.styles'

export const ArtistIntroduction: FC = () => {
  const { id: artistId } = useQueryParamId()
  const { data: artist } = useArtistQuery(artistId)
  const { data: introduction } = useArtistIntroductionQuery(artistId)

  return (
    <Box mt={8}>
      <BriefTitle>
        <BriefIcon />
        {artist?.name}简介
      </BriefTitle>
      <BriefIntroduction>{introduction?.briefDesc}</BriefIntroduction>

      {introduction?.introduction.map((item, index) => (
        <Fragment key={index}>
          <HeaderTitle>{item.ti}</HeaderTitle>
          <IntroductionText>{item.txt}</IntroductionText>
        </Fragment>
      ))}
    </Box>
  )
}
