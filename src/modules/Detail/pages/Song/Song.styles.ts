import styled from 'styled-components'

import { Container } from '@/components/UI'

export const SongWrapper = styled(Container)`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  box-sizing: border-box;
  display: flex;
`

export const SongLeft = styled.div`
  width: 709px;
  border-right: 1px solid #d3d3d3;
  padding: 37px 30px 40px 39px;
  box-sizing: border-box;
`

export const SongRight = styled.div`
  margin-left: 1px;
  width: 271px;
  padding: 20px 40px 40px 30px;
  box-sizing: border-box;
`
