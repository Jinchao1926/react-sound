import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { Box } from '@/components/Core'

import { FriendLogin } from './FriendLogin'

const Friend: FC = () => {
  return (
    <>
      <Helmet>
        <title>我的关注 - React Sound</title>
        <meta name="description" content="我的关注" />
      </Helmet>
      <Box>
        <FriendLogin />
      </Box>
    </>
  )
}

export default Friend
