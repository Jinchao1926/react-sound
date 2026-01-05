import { type FC } from 'react'

import { Box, Paragraph } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'
import { type MV } from '@/types/mv'

export const MVIntroduction: FC<{ mv: MV }> = ({ mv }) => {
  return (
    <Box mb={40}>
      <SectionHeader variant="simple" title="MV简介" />
      <Box mt={18}>
        <Paragraph color="#999" lineHeight={18} m={0}>
          发布时间: {mv.publishTime}
        </Paragraph>
        <Paragraph color="#999" lineHeight={18} m={0}>
          播放次数: {mv.playCount}次
        </Paragraph>
      </Box>
    </Box>
  )
}
