import { type FC } from 'react'

import cloudImg from '@/assets/img/download/cloud.png'
import musicCoverImg from '@/assets/img/download/music_cover.png'
import recognizeImg from '@/assets/img/download/recognize.png'
import socialImg from '@/assets/img/download/social.png'
import starsImg from '@/assets/img/download/stars.png'
import { Box, FlexContainer, Image } from '@/components/Core'

import {
  MusicContent,
  StarContent,
  SocialContent,
  CloudContent,
  RecognizeContent,
  DescriptionContent,
} from './Download.styles'
import { DownloadClient } from './DownloadClient'
import { DownloadQRCode } from './DownloadQRCode'

export const Download: FC = () => {
  return (
    <Box>
      <DownloadClient />
      <MusicContent>
        <FlexContainer justifyContent="space-between">
          <DescriptionContent>
            <h3>千万曲库 首首CD音质</h3>
            <p>
              囊括百万无损SQ音乐，你在用手机听歌时，
              <br />
              也能感受到纤毫毕现的CD音质，更能免费离线收听
            </p>
          </DescriptionContent>
          <Image src={musicCoverImg} width={408} height={190} />
        </FlexContainer>
      </MusicContent>

      <StarContent>
        <FlexContainer justifyContent="space-between">
          <Image src={starsImg} width={447} height={272} />
          <DescriptionContent>
            <h3>千位明星 亲自推荐音乐</h3>
            <p>
              韩红，戴佩妮等
              <em>千位明星已入驻</em>
              ，亲自创建私房歌单，录制独
              <br />
              家DJ节目，推荐他们心中的好音乐
            </p>
          </DescriptionContent>
        </FlexContainer>
      </StarContent>

      <SocialContent>
        <FlexContainer justifyContent="space-between">
          <DescriptionContent>
            <h3>社交关系 发现全新音乐</h3>
            <p>
              你可以
              <em>关注明星</em>
              、DJ和好友，通过浏览他们的动态、收藏和
              <br />
              分享，发现更多全新好音乐
            </p>
          </DescriptionContent>
          <Image src={socialImg} width={463} height={289} />
        </FlexContainer>
      </SocialContent>

      <CloudContent>
        <FlexContainer justifyContent="space-between">
          <Image src={cloudImg} width={435} height={246} />
          <DescriptionContent>
            <h3>手机电脑 歌单实时同步</h3>
            <p>
              只要一个帐号，你就可以同步在手机、电脑上创建、收藏
              <br />
              的歌单，
              <em>随时随地畅享好音乐</em>
            </p>
          </DescriptionContent>
        </FlexContainer>
      </CloudContent>

      <RecognizeContent>
        <FlexContainer justifyContent="space-between">
          <DescriptionContent ml={30} mt={96}>
            <h3>听歌识曲 助你疯狂猜歌</h3>
            <p>
              歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
              <br />用<em>听歌识曲</em>
              功能，几秒钟就知道歌名
            </p>
          </DescriptionContent>
          <Image src={recognizeImg} width={359} height={355} />
        </FlexContainer>
      </RecognizeContent>
      <DownloadQRCode />
    </Box>
  )
}
