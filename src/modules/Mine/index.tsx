import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { Box } from '@/components/Core'

import { MineLogin } from './MineLogin'

const Mine: FC = () => {
  return (
    <>
      <Helmet>
        <title>我的音乐 - React Sound</title>
        <meta name="description" content="我的音乐" />
      </Helmet>
      <Box>
        <MineLogin />
      </Box>
    </>
  )
}

export default Mine
