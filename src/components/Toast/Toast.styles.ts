import styled from 'styled-components'

export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`

export const ToastItem = styled.div<{ type: 'error' | 'success' | 'info' }>`
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  animation: slideIn 0.3s ease-out;

  ${(props) => {
    switch (props.type) {
      case 'error':
        return `
          background-color: #fee;
          color: #c33;
          border-left: 4px solid #c33;
        `
      case 'success':
        return `
          background-color: #efe;
          color: #3c3;
          border-left: 4px solid #3c3;
        `
      case 'info':
        return `
          background-color: #eef;
          color: #33c;
          border-left: 4px solid #33c;
        `
    }
  }}

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
