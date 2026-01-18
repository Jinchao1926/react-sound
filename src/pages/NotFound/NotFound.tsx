import { type FC } from 'react'

import { Container, Text } from '@/components/Core'
import { Sprite } from '@/components/Core/Spirit/Sprite'

import { NotFoundWrapper } from './NotFound.styles'

export const NotFound: FC = () => {
  return (
    <Container>
      <NotFoundWrapper>
        <Sprite sprite="logo" icon="404" width={270} height={112} />
        <Text fontSize={16} color="#666">
          很抱歉，你要查找的网页找不到
        </Text>
      </NotFoundWrapper>
    </Container>
  )
}
