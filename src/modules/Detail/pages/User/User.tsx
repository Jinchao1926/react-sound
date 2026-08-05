import { type FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

export const User: FC = () => {
  const { id: userId } = useQueryParamId()

  return <div>TODO User: {userId}</div>
}
