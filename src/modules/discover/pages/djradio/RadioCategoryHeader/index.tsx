import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  ElementRef,
} from 'react'
import type { FC, ReactNode } from 'react'

import { Carousel } from 'antd'
import classNames from 'classnames'
import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '@/store'

import { RadioCategoryHeaderWrapper, RadioCategoryImage } from './style'

interface IProps {
  children?: ReactNode
  id?: number
}
const pageSize = 18

const RadioCategoryHeader: FC<IProps> = (props: IProps) => {
  const { id } = props
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)
  // redux
  const categories = useAppSelector(
    (state) => state.radio.categories,
    shallowEqual
  )

  // 计算页码
  useEffect(() => {
    const page = Math.ceil(categories.length / pageSize) || 1
    const array = Array(page)
      .fill(0)
      .map((_, i) => i)
    setPages(array)
  }, [categories])

  const onBeforeChange = useCallback((current: number, next: number) => {
    setCurrentPage(next)
  }, [])

  return (
    <RadioCategoryHeaderWrapper>
      <button
        className="sprite_radio_slider arrow left"
        disabled={currentPage === 0}
        onClick={() => pageRef.current?.prev()}
      />
      <Carousel
        className="category-list"
        dots={{ className: 'dots' }}
        ref={pageRef}
        beforeChange={onBeforeChange}
      >
        {pages.map((page) => {
          return (
            <div className="category-page" key={page}>
              {categories
                .slice(page * pageSize, (page + 1) * pageSize)
                .map((item) => {
                  return (
                    <NavLink
                      key={item.id}
                      to={`/discover/djradio/category?id=${item.id}`}
                      className={classNames('category-item sprite_radio', {
                        selected: id === item.id,
                      })}
                    >
                      <RadioCategoryImage
                        className="icon"
                        bgImage={item.picWebUrl}
                      />
                      <span>{item.name}</span>
                    </NavLink>
                  )
                })}
            </div>
          )
        })}
      </Carousel>
      <button
        className="sprite_radio_slider arrow right"
        onClick={() => pageRef.current?.next()}
        disabled={currentPage === pages.length - 1}
      />
    </RadioCategoryHeaderWrapper>
  )
}

export default memo(RadioCategoryHeader)
