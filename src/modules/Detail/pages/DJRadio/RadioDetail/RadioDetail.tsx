import { FC } from 'react'

import { SpriteGreyButton } from '@/components/Buttons'
import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { RadioBadge } from '@/components/Shared/Badge'
import { useRadioDetailQuery } from '@/hooks/djradio/useRadioDetailQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

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
              {/* <PlayButton>
                {`播放 ${formatMinuteSecond(program.duration, 'chinese')}`}
              </PlayButton>
              <SpriteGreyButton icon="grey" padding="0 2px 0 10px">
                <LikedIcon $liked={false} />
                {`(${formatPlayCount(program.likedCount)})`}
              </SpriteGreyButton>
              <SpriteGreyButton icon="commentGrey">
                {`(${formatPlayCount(program.commentCount)})`}
              </SpriteGreyButton> */}
              <SpriteGreyButton icon="shareGrey">{`分享(${radio.shareCount})`}</SpriteGreyButton>
            </Flex>
          </Flex>

          <Box mb={27}>
            <ExpandableParagraph maxChars={100} m={0}>
              {`${radio.desc}`}
            </ExpandableParagraph>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
