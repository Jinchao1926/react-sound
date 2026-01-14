import { forwardRef, type PropsWithChildren, useMemo, useState } from 'react'

import { ExpandButton } from '@/components/Buttons/ExpandButton'
import { getDisplayLength, sliceByDisplayLength } from '@/utils/stringUtils'

import { Paragraph } from './Text'
import { Box, type Styles } from '../Layout/Box'

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

      if (expanded) {
        return { content, isArray, hasMore: false }
      }

      // Slice by lines
      if (maxLines && isArray && content.length > maxLines) {
        return { content: content.slice(0, maxLines), isArray, hasMore: true }
      }

      // Slice by characters (display length)
      if (maxChars) {
        if (isArray) {
          const fullText = (content as string[]).join('\n')
          return {
            content: sliceByDisplayLength(fullText, maxChars).split('\n'),
            isArray,
            hasMore: getDisplayLength(fullText) > maxChars,
          }
        } else {
          const fullText = content as string
          return {
            content: sliceByDisplayLength(fullText, maxChars),
            isArray,
            hasMore: getDisplayLength(fullText) > maxChars,
          }
        }
      }

      return { content, isArray, hasMore: false }
    }, [children, expanded, maxLines, maxChars])

    return (
      <Box ref={ref} display={rest.display}>
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

        {hasMore && (
          <Box textAlign={expandPosition}>
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
          </Box>
        )}
      </Box>
    )
  }
)

ExpandableParagraph.displayName = 'ExpandableParagraph'
