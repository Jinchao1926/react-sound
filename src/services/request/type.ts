import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RSRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface RSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RSRequestInterceptors<T>
  showLoading?: boolean
}
