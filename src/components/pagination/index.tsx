import React, { memo, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { Pagination } from 'antd';

import { PaginationWrapper } from './style'

interface IProps {
  children?: ReactNode;
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

const JCPagination: FC<IProps> = (props: IProps) => {
  const { current, total, onPageChange } = props

  const itemRender = useCallback((page: number, type: string, originalElement: React.ReactNode) => {
    if (type === 'prev') {
      return <button className='prev btn sprite_button2'>上一页</button>
    }
    if (type === 'next') {
      return <button className='next btn sprite_button2'>下一页</button>
    }
    return React.cloneElement(originalElement as React.ReactElement<any>, { className: 'sprite_button2' })
  }, [])

  return (
    <PaginationWrapper>
      <Pagination className='pagination'
        size='small'
        showSizeChanger={false}
        pageSize={35}
        total={total}
        current={current} 
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  )
}

export default memo(JCPagination)