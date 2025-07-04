import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { platforms } from '@/constants/region'

import { ClientListWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const ClientList: FC<IProps> = () => {
  return (
    <ClientListWrapper className="clients">
      {platforms.map((item) => {
        return (
          <div className="client-item" key={item.title}>
            <img className="client-icon" src={item.picUrl} alt={item.title} />
            {item.title}
          </div>
        )
      })}
    </ClientListWrapper>
  )
}

export default memo(ClientList)
