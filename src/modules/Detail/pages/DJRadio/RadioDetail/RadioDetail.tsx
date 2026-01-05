import { type FC } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { RadioCategoryLink } from '@/components/Links'
import { RadioBadge } from '@/components/Shared/Badge'
import {
  PlayGreyButton,
  ShareGreyButton,
  SubscribeBlueButton,
} from '@/components/Shared/Social'
import { useRadioDetailQuery } from '@/hooks/djradio/useRadioDetailQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

import { RadioPrograms } from '../RadioPrograms'

export const RadioDetail: FC<{ radioId: number }> = ({ radioId }) => {
  const { data: radio } = useRadioDetailQuery(radioId)

  if (!radio) return null

  return (
    <Box mt={10}>
      <Flex gap={30}>
        <CoverImage
          src={formatSizedImage(radio.picUrl, 200)}
          alt={radio.name}
          size={200}
          coverSprite="cover"
          coverIcon="bright200"
          coverEdge={-4}
        />

        <Box flex={1}>
          <Flex gap={10} mb={12}>
            <RadioBadge />
            <Text fontSize={20}>{radio.name}</Text>
          </Flex>

          <Flex align="center" mb={20}>
            <CoverImage
              src={formatSizedImage(radio.dj.avatarUrl, 35)}
              alt={radio.dj.nickname}
              to={routeBuilder.user(radio.dj.userId)}
              size={35}
            />
            <TextNavLink
              to={routeBuilder.user(radio.dj.userId)}
              color="#0c73c2"
              ml={10}
            >
              {radio.dj.nickname}
            </TextNavLink>
            <IdentityIcon avatarDetail={radio.dj.avatarDetail} />
          </Flex>

          <Flex gap={26} mt={20} mb={25}>
            <Flex gap={10} align="center">
              <SubscribeBlueButton count={radio.subCount} hasPrefix />
              <PlayGreyButton title="播放全部" />
              <ShareGreyButton count={radio.shareCount} hasPrefix />
            </Flex>
          </Flex>

          <Box mb={27}>
            <RadioCategoryLink
              category={{
                id: radio.categoryId,
                name: radio.category,
              }}
            />
            <ExpandableParagraph maxChars={128} my={0} ml={10} display="inline">
              {`${radio.desc}`}
            </ExpandableParagraph>
          </Box>
        </Box>
      </Flex>

      <RadioPrograms radioId={radioId} />
    </Box>
  )
}
