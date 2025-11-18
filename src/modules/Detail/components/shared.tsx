import styled from 'styled-components'

import { FlexContainer } from '@/components/Core'

export const DetailWrapper = styled(FlexContainer)`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  box-sizing: border-box;
`

export const DetailLeftContent = styled.div`
  width: 709px;
  border-right: 1px solid #d3d3d3;
  padding: 37px 30px 40px 39px;
  box-sizing: border-box;
`

export const DetailRightContent = styled.div`
  margin-left: 1px;
  width: 271px;
  padding: 20px 40px 40px 30px;
  box-sizing: border-box;
`
