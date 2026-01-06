import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
`

export const InputPrefix = styled.span`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  color: #9b9b9b;
  pointer-events: none;
  z-index: 1;
`

interface StyledInputProps {
  $hasPrefix: boolean
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 4px 11px;
  padding-left: ${({ $hasPrefix }) => ($hasPrefix ? '30px' : '11px')};
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: #bfbfbf;
  }

  &:hover {
    border-color: #4096ff;
  }

  &:focus {
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: rgba(0, 0, 0, 0.04);
    cursor: not-allowed;

    &:hover {
      border-color: #d9d9d9;
    }
  }
`
