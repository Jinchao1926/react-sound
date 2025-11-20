import styled from 'styled-components'

import { Paragraph } from '@/components/Core'

export const AlbumParagraph = styled(Paragraph)`
  margin: 4px 0 0;
  line-height: 18px;
  color: #666;
`

export const PlaylistCover = styled.div`
  position: relative;
  padding: 4px;
  border: 1px solid #ccc;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
`

export const PlaylistDescription = styled.p`
  margin: 5px 0 0;
  color: #666;
  line-height: 18px;
  white-space: pre-line;
`
