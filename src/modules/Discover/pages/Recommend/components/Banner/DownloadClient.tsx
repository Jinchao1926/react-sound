import React, { FC } from 'react'

import {
  DownloadClientBG,
  DownloadClientButton,
  DownloadClientDesc,
} from './DownloadClient.styles'

export const DownloadClient: FC = () => {
  return (
    <DownloadClientBG>
      <DownloadClientButton
        href="https://music.163.com/#/download"
        target="_blank"
      />
      <DownloadClientDesc>
        PC 安卓 iPhone WP iPad Mac 六大客户端
      </DownloadClientDesc>
    </DownloadClientBG>
  )
}
