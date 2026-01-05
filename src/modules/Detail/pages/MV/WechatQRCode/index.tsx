import { type FC } from 'react'

import { Box, Flex, Paragraph, Sprite } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'

export const WechatQRCode: FC = () => {
  return (
    <Box mt={40} mb={20}>
      <SectionHeader variant="simple" title="网易云音乐公众号" />
      <Flex align="end" gap={15} mt={18}>
        <Sprite
          sprite="platformDownload"
          icon="qrCode"
          width={72}
          height={72}
          flexShrink={0}
        />
        <Paragraph color="#999" lineHeight={19} m={0}>
          关注我，我们才能 真正拥有彼此啊~
        </Paragraph>
      </Flex>
    </Box>
  )
}
