import styled from 'styled-components'

import { Flex } from '@/components/Core'

export const DownloadTitle = styled.div`
  margin-bottom: 23px;
  font-size: 22px;
  opacity: 0.8;
  color: white;
  text-align: center;
`

export const DownloadPlatform = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 44px;
  margin: 20px auto;
`

export const Mac = styled.div`
  background: url(${require('@/assets/img/download/mac.png')});
  background-size: 154px 44px;
  width: 154px;
  height: 44px;
`

export const Windows = styled.div`
  background: url(${require('@/assets/img/download/windows.png')});
  background-size: 154px 44px;
  width: 154px;
  height: 44px;
`

export const WinDownload = styled.div`
  padding-top: 12px;
  font-size: 14px;
  color: #fff;
  opacity: 0.6;
`

export const IOS = styled.div`
  background: url(${require('@/assets/img/download/iOS.png')});
  background-size: 120px 44px;
  width: 120px;
  height: 44px;
`

export const Android = styled.div`
  background: url(${require('@/assets/img/download/android.png')});
  background-size: 120px 44px;
  width: 120px;
  height: 44px;
`

export const DownloadButton = styled.button`
  width: 300px;
  height: 65px;
  border-radius: 65px;
  background-color: #fff;
  color: #d10000;
  font-size: 22px;
  cursor: pointer;
  &:hover {
    background-color: #bababa;
  }
`

export const OtherClients = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

export const OtherClientsIcon = styled.div`
  background: url(${require('@/assets/img/download/download_icon.png')});
  background-size: 20px;
  width: 20px;
  height: 20px;
`
