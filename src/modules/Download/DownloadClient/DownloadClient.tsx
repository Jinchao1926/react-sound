import type { FC } from 'react'
import { useState } from 'react'

import { Popover } from 'antd'

import mobileImg from '@/assets/img/download/mobile.png'
import pcImg from '@/assets/img/download/pc.png'
import { Box, FlexContainer, Image, TextNavLink } from '@/components/Core'

import {
  Android,
  DownloadButton,
  DownloadPlatform,
  DownloadTitle,
  IOS,
  Mac,
  OtherClients,
  OtherClientsIcon,
  WinDownload,
  Windows,
} from './DownloadClient.styles'
import { ClientList } from '../ClientList'

export const DownloadClient: FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Box backgroundColor="#222">
      <FlexContainer
        variant="large"
        textAlign="center"
        position="relative"
        pt={80}
        pb={84}
      >
        {/* PC */}
        <Box width={556}>
          <DownloadTitle>在电脑上听</DownloadTitle>
          <Image src={pcImg} alt="pc" width={464} height={273} />
          <DownloadPlatform>
            <Mac />
            <Windows />
          </DownloadPlatform>
          <DownloadButton>下载电脑端</DownloadButton>
          <WinDownload>
            Windows版本全新升级, 抢先内测 (
            <TextNavLink color="#fff" to="/#">
              win64下载
            </TextNavLink>
            &nbsp;&nbsp;
            <TextNavLink color="#fff" to="/#">
              win32下载
            </TextNavLink>
            )
          </WinDownload>
        </Box>

        {/* Mobile */}
        <Box width={400} marginLeft={220}>
          <DownloadTitle>在手机上听</DownloadTitle>
          <Image src={mobileImg} alt="mobile" width={246} height={273} />
          <DownloadPlatform>
            <IOS />
            <Android />
          </DownloadPlatform>
          <DownloadButton>下载手机端</DownloadButton>
        </Box>

        {/* Other Clients */}
        <Popover
          content={<ClientList />}
          trigger="click"
          placement="topRight"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <OtherClients>
            <OtherClientsIcon />
            其他操作系统客户端
          </OtherClients>
        </Popover>
      </FlexContainer>
    </Box>
  )
}
