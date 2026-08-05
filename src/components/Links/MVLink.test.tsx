import type { ReactNode } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MVLink } from './MVLink'

vi.mock('react-router', () => ({
  NavLink: ({
    to,
    children,
    className,
  }: {
    to: string
    children: ReactNode
    className?: string
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  Navigate: () => null,
}))

vi.mock('@/routers', () => ({
  routeBuilder: {
    mv: (id: number) => `/mv?id=${id}`,
  },
}))

const renderMVLink = (variant?: 'playbar' | 'list' | 'detail') =>
  render(<MVLink mvID={123} variant={variant} />)

describe('MVLink', () => {
  it('uses the track-list MV icon for the default variant', () => {
    renderMVLink()

    expect(screen.getByTitle('播放MV')).toHaveStyle({
      backgroundPosition: '0 -151px',
    })
  })

  it('uses the playbar MV icon for the playbar variant', () => {
    renderMVLink('playbar')

    expect(screen.getByRole('link').firstElementChild).toHaveStyle({
      backgroundPosition: '0 -57px',
    })
  })
})
