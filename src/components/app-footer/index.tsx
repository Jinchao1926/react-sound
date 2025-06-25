import React, { Fragment, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { AppFooterWrapper, FooterBottom, FooterTop } from './style'
import { footerLinks, footerCopyRights } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <AppFooterWrapper>
      <div className="content wrap-v2">
        <FooterTop>
          {footerLinks.map((item) => {
            return (
              <div key={item.title}>
                <a className={'logofooter ' + item.logo} href={item.link}>
                  {' '}
                </a>
                <span className="title">{item.title}</span>
              </div>
            )
          })}
        </FooterTop>
        <FooterBottom>
          <div className="copyright">
            {footerCopyRights.map((item) => {
              return (
                <Fragment key={item.title}>
                  <a href={item.link}>{item.title}</a>
                  <span className="line">|</span>
                </Fragment>
              )
            })}
          </div>
          <div className="copyright">
            <a className="text" href="https://jubao.163.com/">
              廉正举报
            </a>
            <span className="text">
              不良信息举报邮箱: 51jubao@service.netease.com
            </span>
            <span className="text">客服热线: 95163298</span>
          </div>
          <div className="copyright">
            <span className="text">
              互联网宗教信息服务许可证：浙（2022）0000120
            </span>
            <span className="text">增值电信业务经营许可证：浙B2-20150198</span>
            <a
              className="text"
              href="https://beian.miit.gov.cn/#/Integrated/index"
            >
              粤B2-20090191-18 工业和信息化部备案管理系统网站
            </a>
          </div>
          <div className="copyright">
            <span className="text">网易公司版权所有©1997-2023</span>
            <span>杭州乐读科技有限公司运营：</span>
            <a
              className="text"
              href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/24498695788/9de7/9e78/fc8d/35d33543c69c9f4c5ac8aeb937217597.png"
            >
              浙网文[2021] 1186-054号
            </a>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564">
              <span className="logo-police"></span>
              <span>浙公网安备 33010902002564号</span>
            </a>
          </div>
        </FooterBottom>
      </div>
    </AppFooterWrapper>
  )
}

export default memo(AppFooter)
