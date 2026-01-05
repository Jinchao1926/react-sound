import styled from 'styled-components'

import { Box, type Styles } from '../Layout/Box'

interface HeadProps extends Styles {
  level?: 1 | 2 | 3 | 4 | 5
}

export const Head = styled(Box).attrs<HeadProps>(({ level = 3 }) => ({
  as: `h${level}`,
}))<HeadProps>``

export const Text = styled(Box).attrs({ as: 'span' })<Styles>``

export const Strong = styled(Box).attrs({ as: 'strong' })<Styles>``

export const Paragraph = styled(Box).attrs({ as: 'p' })<Styles>``
