import { FC, PropsWithChildren, useMemo, useState } from 'react'

import { ExpandButton } from '@/components/Buttons/ExpandButton'

import { Paragraph } from './Text'
import { Box, Styles } from '../Layout/Box'
import { Flex } from '../Layout/Flex'

interface ExpandParagraphProps extends Styles {
  maxLength: number
  split?: boolean
}

export const ExpandableParagraph: FC<
  PropsWithChildren<ExpandParagraphProps>
> = ({ maxLength, split, children, ...rest }) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)

  const content = children as string
  const contents = useMemo(() => {
    const sliced = content.slice(0, showingMore ? undefined : maxLength)

    return split ? sliced.split('\n') : [sliced]
  }, [content, showingMore, maxLength, split])

  return (
    <Box>
      {contents.map((line, index) => {
        const isLastLine = index === contents.length - 1
        const shouldShowEllipsis = !showingMore && content.length > maxLength

        return (
          <Paragraph
            key={index}
            whiteSpace="pre-line"
            color="#666"
            lineHeight={18}
            mb={0}
            {...rest}
          >
            {line}
            {isLastLine && shouldShowEllipsis && '...'}
          </Paragraph>
        )
      })}
      <Flex justify="flex-end">
        {content.length > maxLength && (
          <ExpandButton
            expanded={!showingMore}
            onClick={() => setShowingMore((prev) => !prev)}
          />
        )}
      </Flex>
    </Box>
  )
}
