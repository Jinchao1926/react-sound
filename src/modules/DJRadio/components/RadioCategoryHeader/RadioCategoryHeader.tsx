import { type FC, useMemo, useState, useRef } from 'react'

import { Helmet } from 'react-helmet-async'

import { Carousel, type CarouselRef } from '@/components/Carousel'

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
  const pageRef = useRef<CarouselRef>(null)

  const { paginatedCategories } = useRadioCategories()

  const selectedCategory = useMemo(() => {
    if (!id) return null
    for (const page of paginatedCategories) {
      const category = page.find((cat) => cat.id === id)
      if (category) return category
    }
    return null
  }, [id, paginatedCategories])

  return (
    <>
      <Helmet>
        <title>
          {selectedCategory
            ? `${selectedCategory.name} - 主播电台 - React Sound`
            : '主播电台 - React Sound'}
        </title>
        <meta
          name="description"
          content={selectedCategory ? selectedCategory.name : '主播电台'}
        />
      </Helmet>
      <RadioCategoryHeaderWrapper>
        <ArrowLeft
          onClick={() => pageRef.current?.prev()}
          disabled={currentPage === 0}
        />
        <Carousel
          dots={{ className: 'dots' }}
          ref={pageRef}
          infinite={false}
          animated={false}
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
    </>
  )
}
