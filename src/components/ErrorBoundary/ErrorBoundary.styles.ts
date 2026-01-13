import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`

export const ErrorTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  max-width: 500px;
  text-align: center;
`

export const ErrorButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ec4141;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d63232;
  }
`
