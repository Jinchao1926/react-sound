import { type FC } from 'react'

import { useToast } from '@/components/Toast/ToastContext'

import { ToastContainer, ToastItem } from './Toast.styles'

/**
 * Toast notification container
 * Displays all pending toast messages
 */
export const Toast: FC = () => {
  const { toasts, remove } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          type={toast.type}
          onClick={() => remove(toast.id)}
          style={{ cursor: 'pointer' }}
        >
          {toast.message}
        </ToastItem>
      ))}
    </ToastContainer>
  )
}
