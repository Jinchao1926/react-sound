import React, { FC, useCallback } from 'react'

import { Pagination } from 'antd'

import { NextButton, PaginationWrapper, PrevButton } from './Pagination.styles'

interface PaginationProps {
  current: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export const JCPagination: FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onPageChange,
}) => {
  const itemRender = useCallback(
    (_: number, type: string, originalElement: React.ReactNode) => {
      if (type === 'prev') {
        return <PrevButton>上一页</PrevButton>
      }
      if (type === 'next') {
        return <NextButton>下一页</NextButton>
      }
      return originalElement
    },
    []
  )

  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        showSizeChanger={false}
        pageSize={pageSize}
        total={total}
        current={current}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  )
}
