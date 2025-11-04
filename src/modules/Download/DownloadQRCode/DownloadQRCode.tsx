import React, { type FC } from 'react'

import { Image, Paragraph } from '@/components/UI'

import { DownloadQRCodeWrapper } from './DownloadQRCode.styles'

export const DownloadQRCode: FC = () => {
  return (
    <DownloadQRCodeWrapper>
      <Image
        src={require('@/assets/img/download/qrcode.png')}
        alt="移动端下载"
        width={100}
        height={100}
      />
      <Paragraph mt={10}>扫描二维码下载</Paragraph>
    </DownloadQRCodeWrapper>
  )
}
