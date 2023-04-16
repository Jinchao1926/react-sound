import axios from "axios"
import type { AxiosInstance } from "axios"
import type { RSRequestInterceptors, RSRequestConfig } from "./type"

class RSRequest {
  private instance: AxiosInstance
  private interceptors?: RSRequestInterceptors
  private showLoading: boolean

  constructor(config: RSRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? false

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } 
        return data
      },
      (error) => {
        if (error.response.status === 404) {
          console.log('404的错误~')
        }
        return error
      }
    )
  }

  request<T = any>(config: RSRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. Loading
      this.showLoading = config.showLoading ?? false

      //
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = false
          resolve(res)
      }).catch((err) => {
        this.showLoading = false
        reject(err)
        return err
      })
    })
  }

  get<T = any>(config: RSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T = any>(config: RSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: RSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default RSRequest