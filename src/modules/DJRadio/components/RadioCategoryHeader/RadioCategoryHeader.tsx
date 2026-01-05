import { type FC, useState, useRef, type ElementRef } from 'react'

import { Carousel } from 'antd'

import {
  ArrowLeft,
  ArrowRight,
  RadioCategoryHeaderWrapper,
  RadioCategoryPage,
} from './RadioCategoryHeader.styles'
import { useRadioCategories } from '../../hooks/useRadioCategories'
import { RadioCategoryItem } from '../RadioCategoryItem'

export const RadioCategoryHeader: FC<{ id?: number }> = ({ id }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)

  const { paginatedCategories } = useRadioCategories()

  return (
    <RadioCategoryHeaderWrapper>
      <ArrowLeft
        onClick={() => pageRef.current?.prev()}
        disabled={currentPage === 0}
      />
      <Carousel
        dots={{ className: 'dots' }}
        ref={pageRef}
        beforeChange={(_, next) => setCurrentPage(next)}
      >
        {paginatedCategories.map((pageCategories, pageIndex) => (
          <RadioCategoryPage key={pageIndex}>
            {pageCategories.map((item) => (
              <RadioCategoryItem
                key={item.id}
                category={item}
                selected={id === item.id}
              />
            ))}
          </RadioCategoryPage>
        ))}
      </Carousel>
      <ArrowRight
        onClick={() => pageRef.current?.next()}
        disabled={currentPage === paginatedCategories.length - 1}
      />
    </RadioCategoryHeaderWrapper>
  )
}
