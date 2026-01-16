import { forwardRef, type PropsWithChildren, useMemo, useState } from 'react'

import { ExpandButton } from '@/components/Buttons/ExpandButton'
import {
  getDisplayLength,
  sliceByDisplayLength,
} from '@/utils/format/stringUtils'

import { Paragraph } from './Text'
import { Box, type Styles } from '../Layout/Box'

interface ExpandParagraphProps extends Styles {
  maxLines?: number
  maxChars?: number
  ellipsis?: boolean
  expandPosition?: 'left' | 'right'
  onExpand?: (expanded: boolean) => void
}

/**
 * Type guard to check if content is a string array
 */
const isStringArray = (content: string | string[]): content is string[] => {
  return Array.isArray(content)
}

/**
 * Get full text from content (handles both string and string array)
 */
const getFullText = (content: string | string[]): string => {
  return isStringArray(content) ? content.join('\n') : content
}

/**
 * Check if content needs expand/collapse functionality based on limits
 */
const checkNeedsExpansion = (
  content: string | string[],
  isArray: boolean,
  maxLines: number | undefined,
  maxChars: number | undefined
): boolean => {
  // Check by lines limit
  if (maxLines && isArray && content.length > maxLines) {
    return true
  }

  // Check by characters limit
  if (maxChars) {
    const fullText = getFullText(content)
    return getDisplayLength(fullText) > maxChars
  }

  return false
}

/**
 * Truncate text by character limit
 */
const truncateByChars = (
  text: string,
  maxChars: number
): { content: string; canToggle: boolean } => {
  const displayLength = getDisplayLength(text)
  return {
    content: sliceByDisplayLength(text, maxChars),
    canToggle: displayLength > maxChars,
  }
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

    const { content, canToggle, isTruncated, isArray } = useMemo(() => {
      const contentValue = children as string | string[]
      const contentIsArray = isStringArray(contentValue)
      const content: string | string[] = contentValue

      // Determine if content needs expand/collapse functionality
      const needsExpansion = checkNeedsExpansion(
        content,
        contentIsArray,
        maxLines,
        maxChars
      )

      // If expanded, show full content
      if (expanded) {
        return {
          content,
          canToggle: needsExpansion,
          isTruncated: false,
          isArray: contentIsArray,
        }
      }

      // If not expanded, slice content based on limits
      // Slice by lines
      if (maxLines && contentIsArray && content.length > maxLines) {
        return {
          content: content.slice(0, maxLines),
          canToggle: true,
          isTruncated: true,
          isArray: contentIsArray,
        }
      }

      // Slice by characters (display length)
      if (maxChars) {
        const fullText = getFullText(content)
        const { content: truncated, canToggle: toggle } = truncateByChars(
          fullText,
          maxChars
        )
        return {
          content: contentIsArray ? truncated.split('\n') : truncated,
          canToggle: toggle,
          isTruncated: toggle,
          isArray: contentIsArray,
        }
      }

      return {
        content,
        canToggle: false,
        isTruncated: false,
        isArray: contentIsArray,
      }
    }, [children, expanded, maxLines, maxChars])

    // Type-safe content access
    const contentLines = isArray && isStringArray(content) ? content : null

    return (
      <Box ref={ref} display={rest.display}>
        {contentLines ? (
          contentLines.map((line, idx) => (
            <Paragraph
              key={idx}
              whiteSpace="pre-line"
              color="#666"
              lineHeight={18}
              m={0}
              {...rest}
            >
              {line}
              {idx === contentLines.length - 1 &&
                ellipsis &&
                isTruncated &&
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
            {ellipsis && isTruncated && '...'}
          </Paragraph>
        )}

        {canToggle && (
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
