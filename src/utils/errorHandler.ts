import axios from 'axios'

export interface ErrorInfo {
  message: string
  priority: number // 0: low, 1: medium, 2: high
}

/**
 * Classify errors and assign priority levels
 * Higher priority errors will be displayed first
 */
export function classifyError(error: unknown): ErrorInfo {
  // Network error
  if (!navigator.onLine) {
    return { message: 'Network connection failed', priority: 2 }
  }

  // Axios error
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    // 5xx - Server error (highest priority)
    if (status && status >= 500) {
      return { message: 'Server error, please try again later', priority: 2 }
    }

    // 401 - Unauthorized
    if (status === 401) {
      return { message: 'Session expired, please log in again', priority: 2 }
    }

    // 4xx - Client error
    if (status && status >= 400) {
      return { message: 'Request failed, please check network', priority: 1 }
    }

    // Network timeout
    if (error.code === 'ECONNABORTED') {
      return { message: 'Request timeout, please try again', priority: 1 }
    }
  }

  // Default error
  return { message: 'An error occurred, please try again', priority: 1 }
}
