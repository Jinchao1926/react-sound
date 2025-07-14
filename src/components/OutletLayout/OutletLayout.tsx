import React, { FC, Suspense, ReactNode, ElementType } from 'react'

import { Outlet } from 'react-router-dom'

import { DiscoverMenu } from './DiscoverMenu'

interface OutletLayoutProps {
  showMenu?: boolean
  fallback?: ReactNode
  wrapper?: ElementType
  className?: string
}

/**
 * Common layout component with outlet rendering
 */
export const OutletLayout: FC<OutletLayoutProps> = ({
  showMenu = true,
  fallback = '',
  wrapper: Wrapper = 'div',
  className,
}) => {
  return (
    <Wrapper className={className}>
      {showMenu && <DiscoverMenu />}
      <Suspense fallback={fallback}>
        <Outlet />
      </Suspense>
    </Wrapper>
  )
}
