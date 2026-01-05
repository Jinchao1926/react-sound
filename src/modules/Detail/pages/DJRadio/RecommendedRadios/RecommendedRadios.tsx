import { type FC } from 'react'

import { Box, Paragraph, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { useRecommendedRadioQuery } from '@/hooks/djradio/useRecommendedRadioQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

import { RadioItem } from './RecommendedRadios.styles'

export const RecommendedRadios: FC = () => {
  const { data: radios } = useRecommendedRadioQuery()

  return (
    <Box mb={40}>
      <SectionHeader variant="simple" title="你可能也喜欢" />
      <Box mt={20}>
        {radios.map((radio) => (
          <RadioItem key={radio.id}>
            <CoverImage
              src={formatSizedImage(radio.picUrl, 50)}
              to={routeBuilder.radio(radio.id)}
              alt={radio.name}
              size={50}
            />

            <Box width={140}>
              <TextNavLink
                to={routeBuilder.radio(radio.id)}
                fontSize={14}
                lineHeight={24}
                color="#000"
                nowrap
              >
                {radio.name}
              </TextNavLink>

              <Paragraph color="#999" lineHeight={24} m={0}>
                by
                <TextNavLink to={routeBuilder.user(radio.dj.userId)} ml={4}>
                  {radio.dj.nickname}
                </TextNavLink>
              </Paragraph>
            </Box>
          </RadioItem>
        ))}
      </Box>
    </Box>
  )
}
