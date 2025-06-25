import styled from 'styled-components'

export const ClientListWrapper = styled.div`
  width: 236px;
  height: 265px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 8px 0;

  .client-item {
    width: 113px;
    height: 45px;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    font-size: 12px;
    cursor: pointer;

    .client-icon {
      width: 26px;
      height: 26px;
      margin: 0 9px;
    }
  }
`
