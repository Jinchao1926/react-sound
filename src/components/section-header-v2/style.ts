import styled from "styled-components";

export const SectionHeaderV2Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 23px;
  border-bottom: 1px solid #ccc;
  
  .title {
    color: #333;
    font-weight: bold;
  }
  a {
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
`