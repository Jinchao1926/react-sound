import { type FC, type ReactNode } from 'react'

import { NotFound } from '@/pages/NotFound'

interface DetailDataWrapperProps {
  data: any
  isLoading: boolean
  isError: boolean
  children: ReactNode
}

export const DetailDataWrapper: FC<DetailDataWrapperProps> = ({
  data,
  isLoading,
  isError,
  children,
}) => {
  // Show nothing while loading
  if (isLoading) return null

  // Show 404 if error or no data
  if (isError || !data) return <NotFound />

  return <>{children}</>
}
