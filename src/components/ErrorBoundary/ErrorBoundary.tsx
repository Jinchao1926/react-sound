import { Component, type ReactNode } from 'react'

import logger from '@/utils/logger'

import {
  ErrorButton,
  ErrorContainer,
  ErrorMessage,
  ErrorTitle,
} from './ErrorBoundary.styles'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  error?: Error
}

/**
 * ErrorBoundary - 捕获子组件渲染异常的容器
 *
 * ## 异常捕获时序流程
 *
 * ```
 * 子组件抛出异常
 *        ↓
 * getDerivedStateFromError() [静态方法]
 *   ├─ 同步调用，不能有副作用
 *   ├─ 更新 state: { error: Error }
 *   └─ 触发组件重新渲染
 *        ↓
 * render() [同步]
 *   ├─ 检查 state.error 是否存在
 *   ├─ 若存在：显示错误界面
 *   └─ 若不存在：正常渲染 children
 *        ↓
 * componentDidCatch() [异步后调用]
 *   ├─ 在 DOM 更新提交后调用
 *   ├─ 执行副作用（日志、监控等）
 *   └─ 调用 props.onError? 回调
 * ```
 *
 * ## 生命周期方法说明
 *
 * - **getDerivedStateFromError(error)**
 *   - React 官方推荐用于更新 state
 *   - 必须是纯函数，返回新 state
 *   - 不能有副作用（无法调用 logger）
 *
 * - **componentDidCatch(error, errorInfo)**
 *   - 用于处理副作用和日志
 *   - errorInfo 包含 componentStack（错误堆栈）
 *   - 适合上报错误到监控服务
 *
 * ## 使用示例
 *
 * ```tsx
 * // 基础用法
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * // 自定义错误界面和回调
 * <ErrorBoundary
 *   fallback={<CustomErrorUI />}
 *   onError={(error, errorInfo) => {
 *     console.error('App crashed:', error)
 *     // 上报到错误监控服务
 *     reportToSentry(error, errorInfo)
 *   }}
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 *
 * ## 限制说明
 *
 * ✅ 能捕获的错误：
 *   - 渲染中的错误
 *   - 生命周期方法中的错误
 *   - 构造函数中的错误
 *
 * ❌ 无法捕获的错误：
 *   - 事件处理器中的错误（使用 try-catch）
 *   - 异步代码中的错误（使用 .catch()）
 *   - 服务端渲染中的错误
 *   - ErrorBoundary 自身的错误
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: undefined,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ error: undefined })
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <ErrorButton onClick={this.handleReset}>Try again</ErrorButton>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}
