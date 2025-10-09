import { ComponentProps } from 'react'

import styled from 'styled-components'

import { Box, Styles } from '../Layout/Box'

interface ImageProps
  extends Styles,
    Omit<ComponentProps<'img'>, keyof Styles> {}

export const Image = styled(Box).attrs({ as: 'img' })<ImageProps>``
