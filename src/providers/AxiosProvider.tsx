import React, { createContext, useContext, ReactNode, useMemo } from 'react'

import Axios, { AxiosInstance } from 'axios'

const createDefaultAxiosInstance = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    // Bearer token
    const token = localStorage.getItem('access_token')
    if (token && !config.headers.hasAuthorization()) {
      config.headers.setAuthorization(`Bearer ${token}`)
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response

        switch (status) {
          case 401:
            localStorage.removeItem('access_token')
            // eslint-disable-next-line no-console
            console.error('未授权访问，请重新登录')
            break
          case 403:
            // eslint-disable-next-line no-console
            console.error('权限不足')
            break
          case 404:
            // eslint-disable-next-line no-console
            console.error('请求的资源不存在')
            break
          case 500:
            // eslint-disable-next-line no-console
            console.error('服务器错误')
            break
          default:
            // eslint-disable-next-line no-console
            console.error(`请求失败: ${status}`)
        }
      } else if (error.request) {
        // eslint-disable-next-line no-console
        console.error('网络错误，请检查网络连接')
      } else {
        // eslint-disable-next-line no-console
        console.error('请求配置错误:', error.message)
      }
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
  const axiosInstance = useMemo(() => {
    return value || defaultAxiosInstance
  }, [value])

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

export default AxiosProvider
