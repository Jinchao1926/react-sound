import { forwardRef, PropsWithChildren, useMemo, useState } from 'react'

import { ExpandButton } from '@/components/Buttons/ExpandButton'

import { Paragraph } from './Text'
import { Box, Styles } from '../Layout/Box'
import { Flex } from '../Layout/Flex'

interface ExpandParagraphProps extends Styles {
  maxLines?: number
  maxChars?: number
  ellipsis?: boolean
  expandPosition?: 'left' | 'right'
  onExpand?: (expanded: boolean) => void
}

export const ExpandableParagraph = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ExpandParagraphProps>
>(
  (
    {
      maxLines,
      maxChars,
      ellipsis = true,
      expandPosition = 'right',
      onExpand,
      children,
      ...rest
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false)

    const { content, isArray, hasMore } = useMemo(() => {
      const isArray = Array.isArray(children)
      const content: string | string[] = isArray
        ? children
        : (children as string)
      // const allLines = Array.isArray(content) ? content : content.split('\n')

      if (expanded) {
        return { content, isArray, hasMore: false }
      }

      // Slice by lines
      if (maxLines && isArray && content.length > maxLines) {
        return { content: content.slice(0, maxLines), isArray, hasMore: true }
      }

      // Slice by characters
      if (maxChars) {
        if (isArray) {
          const fullText = (content as string[]).join('\n')
          return {
            content: fullText.slice(0, maxChars).split('\n'),
            isArray,
            hasMore: fullText.length > maxChars,
          }
        } else {
          const fullText = content as string
          return {
            content: fullText.slice(0, maxChars),
            isArray,
            hasMore: fullText.length > maxChars,
          }
        }
      }

      return { content, isArray, hasMore: false }
    }, [children, expanded, maxLines, maxChars])

    return (
      <Box ref={ref}>
        {isArray ? (
          (content as string[]).map((line, idx) => (
            <Paragraph
              key={idx}
              whiteSpace="pre-line"
              color="#666"
              lineHeight={18}
              m={0}
              {...rest}
            >
              {line}
              {idx === (content as string[]).length - 1 &&
                ellipsis &&
                hasMore &&
                '...'}
            </Paragraph>
          ))
        ) : (
          <Paragraph
            whiteSpace="pre-line"
            color="#666"
            lineHeight={18}
            m={0}
            {...rest}
          >
            {content}
            {ellipsis && hasMore && '...'}
          </Paragraph>
        )}

        <Flex justify={expandPosition === 'right' ? 'flex-end' : 'flex-start'}>
          <ExpandButton
            expanded={!expanded}
            onClick={() => {
              setExpanded((prev) => {
                const next = !prev
                onExpand?.(next)
                return next
              })
            }}
          />
        </Flex>
      </Box>
    )
  }
)

ExpandableParagraph.displayName = 'ExpandableParagraph'
