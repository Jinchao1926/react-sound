import styled from 'styled-components'

import { FlexContainer } from '@/components/Core'

export const ToplistWrapper = styled(FlexContainer)`
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
`

export const ToplistLeft = styled.div`
  width: 240px;
  border-right: 1px solid #d3d3d3;
  background-color: #f9f9f9;
`

export const ToplistRight = styled.div`
  width: 740px;
  background-color: #fff;
  padding: 40px 30px 40px 40px;
  box-sizing: border-box;
`
