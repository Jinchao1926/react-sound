import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Popover } from 'antd'

import { 
  DownloadWrapper,
  DownloadContent,
  MusicContent,
  StarContent,
  SocialContent,
  CloudContent,
  RecognizeContent,
  DescriptionContent
} from './style'
import QRcode from './qrcode'
import ClientList from './client-list'

interface IProps {
  children?: ReactNode
}

const Download: FC<IProps> = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <DownloadWrapper>
      <DownloadContent>
        <div className='content wrap-v1'>
          <div className='pc'>
            <div className='title'>在电脑上听</div>
            <img className='icon' src={require('@/assets/img/download/pc.png')} alt=''></img>
            <div className='platform'>
              <div className='mac'></div>
              <div className='windows'></div>
            </div>
            <button className='download'>下载电脑端</button>
            <div className='win-download'>
              Windows版本全新升级, 抢先内测 (
              <a className='win64' href='/#'>win64下载</a>
              &nbsp;&nbsp;
              <a className='win32' href='/#'>win32下载</a>
              )
            </div>
          </div>
          <div className='mobile'>
            <div className='title'>在手机上听</div>
            <img className='icon' src={require('@/assets/img/download/mobile.png')} alt=''></img>
            <div className='platform'>
              <div className='iOS'></div>
              <div className='android'></div>
            </div>
            <button className='download'>下载手机端</button>
          </div>
          <Popover 
            content={ <ClientList /> }
            trigger="click"
            placement='topRight'
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div className='other-clients'>
              <div className='icon'/>
              其他操作系统客户端
            </div>
          </Popover>
          
        </div>
      </DownloadContent>
      <MusicContent>
        <div className='content wrap-v2'>
          <DescriptionContent className='music-left'>
            <h3>千万曲库 首首CD音质</h3>
            <p>
              囊括百万无损SQ音乐，你在用手机听歌时，
              <br />
              也能感受到纤毫毕现的CD音质，更能免费离线收听
            </p>
          </DescriptionContent>
          <div className='music-right' />
        </div>
      </MusicContent>
      <StarContent>
        <div className='content wrap-v2'>
          <div className='star-left' />
          <DescriptionContent className='star-right'>
            <h3>千位明星 亲自推荐音乐</h3>
            <p>
              韩红，戴佩妮等
              <em>千位明星已入驻</em>
              ，亲自创建私房歌单，录制独
              <br />
              家DJ节目，推荐他们心中的好音乐
            </p>
          </DescriptionContent>
        </div>
      </StarContent>
      <SocialContent>
        <div className='content wrap-v2'>
          <DescriptionContent className='social-left'>
            <h3>社交关系 发现全新音乐</h3>
            <p>
              你可以
              <em>关注明星</em>
              、DJ和好友，通过浏览他们的动态、收藏和
              <br />
              分享，发现更多全新好音乐
            </p>
          </DescriptionContent>
          <div className='social-right' />
        </div>
      </SocialContent>
      <CloudContent>
        <div className='content wrap-v2'>
          <div className='cloud-left' />
          <DescriptionContent className='cloud-right'>
            <h3>手机电脑 歌单实时同步</h3>
            <p>
              只要一个帐号，你就可以同步在手机、电脑上创建、收藏
              <br />
              的歌单，
              <em>随时随地畅享好音乐</em>
            </p>
          </DescriptionContent>
        </div>
      </CloudContent>
      <RecognizeContent>
        <div className='content wrap-v2'>
          <DescriptionContent className='recognize-left'>
            <h3>听歌识曲 助你疯狂猜歌</h3>
            <p>
              歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
              <br />
              用
              <em>听歌识曲</em>
              功能，几秒钟就知道歌名
            </p>
          </DescriptionContent>
          <div className='recognize-right' />
        </div>
      </RecognizeContent>
      <QRcode />
    </DownloadWrapper>
  )
}

export default memo(Download)