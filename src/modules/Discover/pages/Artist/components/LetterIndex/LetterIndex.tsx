import { type FC, useMemo } from 'react'

import { Flex } from '@/components/Core'
import { routeBuilder } from '@/routers'

import { LetterButton, ChineseButton } from './LetterIndex.styles'
import { useSelectedCategory } from '../../hooks/useSelectedCategory'

export const LetterIndex: FC = () => {
  const { selectedCategory, selectedInitial } = useSelectedCategory()

  const alphabets = useMemo(
    () => Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    []
  )

  return (
    <Flex gap={3} mt={20}>
      <ChineseButton
        to={routeBuilder.discoverArtist({
          area: selectedCategory.area,
          type: selectedCategory.type,
          initial: -1,
        })}
        $selected={selectedInitial === -1}
      >
        热门
      </ChineseButton>
      {alphabets.map((letter) => {
        const asciiCode = letter.charCodeAt(0)
        return (
          <LetterButton
            key={letter}
            to={routeBuilder.discoverArtist({
              area: selectedCategory.area,
              type: selectedCategory.type,
              initial: asciiCode,
            })}
            $selected={selectedInitial === asciiCode}
          >
            {letter}
          </LetterButton>
        )
      })}
      <ChineseButton
        to={routeBuilder.discoverArtist({
          area: selectedCategory.area,
          type: selectedCategory.type,
          initial: 0,
        })}
        $selected={selectedInitial === 0}
      >
        其他
      </ChineseButton>
    </Flex>
  )
}
