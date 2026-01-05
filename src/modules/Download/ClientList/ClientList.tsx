import { type FC } from 'react'

import { Image } from '@/components/Core'
import { platforms } from '@/constants/platform'

import { ClientItem, ClientListWrapper } from './ClientList.styles'

export const ClientList: FC = () => {
  return (
    <ClientListWrapper>
      {platforms.map((item) => (
        <ClientItem key={item.title}>
          <Image
            src={item.picUrl}
            alt={item.title}
            width={26}
            height={26}
            mx={9}
          />
          {item.title}
        </ClientItem>
      ))}
    </ClientListWrapper>
  )
}
