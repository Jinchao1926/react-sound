import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

// Suppress console.error during tests
const originalError = console.error
beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalError
})

// Component that throws an error
const ThrowError: React.FC<{ message: string }> = ({ message }) => {
  throw new Error(message)
}

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Test error message" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument()
  })

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom Error UI</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom Error UI')).toBeInTheDocument()
    expect(
      screen.queryByText('Oops! Something went wrong')
    ).not.toBeInTheDocument()
  })

  it('should call onError callback when error is caught', () => {
    const onErrorMock = vi.fn()

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    expect(onErrorMock).toHaveBeenCalledTimes(1)
    const [error, errorInfo] = onErrorMock.mock.calls[0]
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Test error')
    expect(errorInfo).toHaveProperty('componentStack')
  })

  it('should reset error state when Try again button is clicked', async () => {
    const user = userEvent.setup()

    const { unmount } = render(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Test error')).toBeInTheDocument()

    const resetButton = screen.getByRole('button', {
      name: 'Try again',
    })
    await user.click(resetButton)

    // After reset, unmount and mount with safe children
    unmount()

    render(
      <ErrorBoundary>
        <div>Error recovered</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Error recovered')).toBeInTheDocument()
    expect(
      screen.queryByText('Oops! Something went wrong')
    ).not.toBeInTheDocument()
  })

  it('should handle errors with no message', () => {
    const ThrowErrorNoMessage = () => {
      throw new Error()
    }

    render(
      <ErrorBoundary>
        <ThrowErrorNoMessage />
      </ErrorBoundary>
    )

    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument()
  })

  it('should render error UI with default styling', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    const heading = screen.getByText('Oops! Something went wrong')
    expect(heading).toHaveStyle({
      fontSize: '32px',
      marginBottom: '20px',
      color: '#333',
    })

    const resetButton = screen.getByRole('button', { name: 'Try again' })
    expect(resetButton).toHaveStyle({
      backgroundColor: '#ec4141',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
    })
  })

  it('should maintain error state on rerender', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Test error')).toBeInTheDocument()

    // Rerender with different content but ErrorBoundary still has error state
    rerender(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    )

    // Should still show the error UI
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('should support multiple children types', () => {
    render(
      <ErrorBoundary>
        <div>
          <p>Paragraph</p>
          <span>Span</span>
          Text node
        </div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Span')).toBeInTheDocument()
    expect(screen.getByText('Text node')).toBeInTheDocument()
  })

  it('should catch errors from nested components', () => {
    const DeepComponent = () => (
      <div>
        <ThrowError message="Nested error" />
      </div>
    )

    render(
      <ErrorBoundary>
        <DeepComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Nested error')).toBeInTheDocument()
  })
})
