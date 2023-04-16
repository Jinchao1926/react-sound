// Service 统一出口

import RSRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export const rsRequest = new RSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch(error) {
      return error;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(error) {
      return error;
    },
  }
})