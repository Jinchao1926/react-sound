import styled from 'styled-components'

export const RecommendSection = styled.div`
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
`

export const RecommendLeft = styled.div`
  width: 729px;
  border-right: 1px solid #d3d3d3;
  padding: 20px 20px 40px;
  // 设置宽度包括内边距和边框的宽度
  box-sizing: border-box;
`

export const RecommendRight = styled.div`
  margin-left: 1px;
  width: 250px;
  height: 100%;
`
