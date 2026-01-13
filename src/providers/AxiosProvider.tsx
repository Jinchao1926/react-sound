import type { ReactNode } from 'react'
import type React from 'react'
import { createContext, useContext, useMemo } from 'react'

import Axios from 'axios'

import { useToast } from '@/components/Toast/ToastContext'
import { classifyError } from '@/utils/errorHandler'
import logger from '@/utils/logger'

import type { AxiosInstance } from 'axios'

let toastCallback: ((message: string) => void) | null = null

export const setToastCallback = (callback: (message: string) => void) => {
  toastCallback = callback
}

const createDefaultAxiosInstance = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    // Attach Bearer token to authorization header
    const token = localStorage.getItem('access_token')
    if (token && !config.headers.hasAuthorization()) {
      config.headers.setAuthorization(`Bearer ${token}`)
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { message } = classifyError(error)
      logger.error('Request failed:', message)
      toastCallback?.(message)
      return Promise.reject(error)
    }
  )

  return instance
}

interface AxiosProviderProps {
  children: ReactNode
  value?: AxiosInstance
}

const defaultAxiosInstance = createDefaultAxiosInstance()
export const AxiosContext = createContext<AxiosInstance>(defaultAxiosInstance)

export const AxiosProvider: React.FC<AxiosProviderProps> = ({
  children,
  value,
}) => {
  const { show } = useToast()
  const axiosInstance = useMemo(() => {
    // Register Toast callback for error notifications
    setToastCallback((message) => show(message, 'error'))
    return value || defaultAxiosInstance
  }, [show, value])

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  )
}

export const useAxios = () => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}
