import styled from 'styled-components'

import { FlexContainer } from '@/components/Core'

export const ArtistWrapper = styled(FlexContainer)`
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
`

export const ArtistLeft = styled.div`
  width: 180px;
  border-right: 1px solid #d3d3d3;
  background-color: #f9f9f9;
`

export const ArtistRight = styled.div`
  width: 800px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
`
