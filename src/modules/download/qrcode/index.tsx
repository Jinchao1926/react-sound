import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { QRcodeWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const QRCode: FC<IProps> = () => {
  return (
    <QRcodeWrapper>
      <img
        src={require('@/assets/img/download/qrcode.png')}
        alt="移动端下载"
      ></img>
      <p>扫描二维码下载</p>
    </QRcodeWrapper>
  )
}

export default memo(QRCode)
