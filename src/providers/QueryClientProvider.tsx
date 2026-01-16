import { type FC, type ReactNode } from 'react'

import {
  type DefaultOptions,
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

interface QueryClientProviderProps {
  children: ReactNode
  options?: DefaultOptions
}

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) =>
      failureCount < 3 &&
      !(axios.isAxiosError(error) && error?.response?.status === 401),
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 30 * 60 * 1000, // 30 mins
  },
}

export const queryClient = new QueryClient({ defaultOptions })

export const QueryClientProvider: FC<QueryClientProviderProps> = ({
  options = {},
  children,
}) => {
  queryClient.setDefaultOptions({
    ...defaultOptions,
    ...options,
  })

  return (
    <Provider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Provider>
  )
}
