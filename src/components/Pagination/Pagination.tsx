import React, { FC, useCallback } from 'react'

import { Pagination } from 'antd'

import { PaginationWrapper } from './Pagination.styles'

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
        return <button className="prev btn sprite_button2">上一页</button>
      }
      if (type === 'next') {
        return <button className="next btn sprite_button2">下一页</button>
      }
      return React.cloneElement(originalElement as React.ReactElement<any>, {
        className: 'sprite_button2',
      })
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
