import styled from 'styled-components'

export const HeaderTitle = styled.h2`
  margin: 28px 0 8px;
  font-size: 14px;
  color: #333;
`

export const BriefTitle = styled(HeaderTitle)`
  display: flex;
  align-items: center;
  gap: 7px;
`

export const BriefIcon = styled.i`
  display: inline-block;
  width: 4px;
  height: 14px;
  background-color: #c10d0c;
`

export const IntroductionText = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 25px;
  color: #666;
  white-space: pre-wrap;
`

export const BriefIntroduction = styled(IntroductionText)`
  text-indent: 2em;
`
