import { type FC } from 'react'

import { Container } from '@/components/Core'

import { LoginBG, LoginButton, LoginTips } from './FriendLogin.styles'

export const FriendLogin: FC = () => {
  const handleLogin = () => {}

  return (
    <Container
      backgroundColor="#fff"
      border="1px solid #d3d3d3"
      borderWidth="0 1px"
      minHeight="700px"
    >
      <LoginBG>
        <LoginTips>
          你可以关注明星和好友品味他们的私房歌单
          <br />
          通过他们的动态发现更多精彩音乐
        </LoginTips>
        <LoginButton onClick={handleLogin} />
      </LoginBG>
    </Container>
  )
}
