import React, { FC, useState, useRef, ElementRef } from 'react'

import { Carousel } from 'antd'

import { PodcastCategoryHeaderWrapper } from './PodcastCategoryHeader.styles'
import { usePodcastCategories } from '../../hooks/usePodcastCategories'
import { PodcastCategoryItem } from '../PodcastCategoryItem'

export const PodcastCategoryHeader: FC<{ id?: number }> = ({ id }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)

  const { paginatedCategories } = usePodcastCategories()

  return (
    <PodcastCategoryHeaderWrapper>
      <button
        className="sprite_radio_slider arrow left"
        disabled={currentPage === 0}
        onClick={() => pageRef.current?.prev()}
      />
      <Carousel
        className="category-list"
        dots={{ className: 'dots' }}
        ref={pageRef}
        beforeChange={(_, next) => setCurrentPage(next)}
      >
        {paginatedCategories.map((pageCategories, pageIndex) => (
          <div className="category-page" key={pageIndex}>
            {pageCategories.map((item) => (
              <PodcastCategoryItem
                key={item.id}
                category={item}
                selected={id === item.id}
              />
            ))}
          </div>
        ))}
      </Carousel>
      <button
        className="sprite_radio_slider arrow right"
        onClick={() => pageRef.current?.next()}
        disabled={currentPage === paginatedCategories.length - 1}
      />
    </PodcastCategoryHeaderWrapper>
  )
}
