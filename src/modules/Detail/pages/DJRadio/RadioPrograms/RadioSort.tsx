import React, { FC } from 'react'

import { Flex, Sprite } from '@/components/Core'

interface RadioSortProps {
  asc: boolean
  onChange: (asc: boolean) => void
}

export const RadioSort: FC<RadioSortProps> = ({ asc, onChange }) => {
  return (
    <Flex>
      <Sprite
        sprite="sort"
        icon={asc ? 'desc' : 'desced'}
        cursor={asc ? 'pointer' : 'default'}
        width={29}
        height={25}
        onClick={() => {
          if (asc) {
            onChange(false)
          }
        }}
      />
      <Sprite
        sprite="sort"
        icon={asc ? 'asced' : 'asc'}
        cursor={asc ? 'default' : 'pointer'}
        width={28}
        height={25}
        onClick={() => {
          if (!asc) {
            onChange(true)
          }
        }}
      />
    </Flex>
  )
}
