import React, { type FC } from 'react'

import { Image, Paragraph } from '@/components/UI'

import { QRcodeWrapper } from './QRCode.styles'

export const QRCode: FC = () => {
  return (
    <QRcodeWrapper>
      <Image
        src={require('@/assets/img/download/qrcode.png')}
        alt="移动端下载"
        width={100}
        height={100}
      />
      <Paragraph mt={10}>扫描二维码下载</Paragraph>
    </QRcodeWrapper>
  )
}
