import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from 'react'

interface Toast {
  id: string
  message: string
  type: 'error' | 'success' | 'info'
}

interface ToastContextType {
  toasts: Toast[]
  show: (message: string, type?: 'error' | 'success' | 'info') => void
  remove: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [recentErrors] = useState(() => new Map<string, number>())

  const show = useCallback(
    (message: string, type: 'error' | 'success' | 'info' = 'error') => {
      // Dedup: only show same message once within 3 seconds
      const now = Date.now()
      const lastTime = recentErrors.get(message)
      if (lastTime && now - lastTime < 3000) {
        return
      }
      recentErrors.set(message, now)

      const id = `${Date.now()}-${Math.random()}`
      setToasts((prev) => [...prev, { id, message, type }])

      // Auto-remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    [recentErrors]
  )

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
