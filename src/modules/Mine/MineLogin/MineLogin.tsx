import React, { type FC } from 'react'

import { Container } from '@/components/Core'

import { LoginBG, LoginButton } from './MineLogin.styles'

export const MineLogin: FC = () => {
  const handleLogin = () => {}

  return (
    <Container
      backgroundColor="#fff"
      border="1px solid #d3d3d3"
      borderWidth="0 1px"
      minHeight="700px"
    >
      <LoginBG>
        <LoginButton onClick={handleLogin} />
      </LoginBG>
    </Container>
  )
}
