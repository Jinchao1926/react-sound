import styled from 'styled-components'

export const SectionHeaderMoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 23px;
  border-bottom: 1px solid #ccc;

  .title {
    font-weight: bold;
  }
  a {
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
`
