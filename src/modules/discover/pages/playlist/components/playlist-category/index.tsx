import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import classNames from 'classnames'
import { shallowEqual } from 'react-redux'

import { useAppSelector, useAppDispatch } from '@/store'

import { PlaylistCategoryWrapper } from './style'
import { changeCurrentCategoryAsync, fetchPlaylistsAsync } from '../../store'

interface IProps {
  children?: ReactNode
  onCategorySelect?: () => void
}

const PlaylistCategory: FC<IProps> = (props: IProps) => {
  const { onCategorySelect } = props

  const { currentCategory, categories } = useAppSelector(
    (state) => ({
      currentCategory: state.playlist.currentCategory,
      categories: state.playlist.categories,
    }),
    shallowEqual
  )

  const dispatch = useAppDispatch()
  const handleCategory = (name: string) => {
    dispatch(changeCurrentCategoryAsync(name))
    dispatch(fetchPlaylistsAsync(0))

    if (onCategorySelect) {
      onCategorySelect()
    }
  }

  return (
    <PlaylistCategoryWrapper onMouseDown={onCategorySelect}>
      <div className="header sprite_category_bg">
        <div className="arrow sprite_icon" />
      </div>
      <div className="body sprite_category_bg">
        <div className="all">
          <button
            className="sprite_button2"
            onClick={() => handleCategory('全部')}
            onMouseDown={(e) => e.stopPropagation()}
          >
            全部风格
          </button>
        </div>
        {categories.map((category, index) => {
          return (
            <dl key={category.type}>
              <dt>
                <i className={'sprite_icon2 icon icon' + index} />
                {category.type}
              </dt>
              <dd>
                {category.categories.map((item) => {
                  return (
                    <React.Fragment key={item.name}>
                      <span
                        className={classNames('name', {
                          selected: currentCategory === item.name,
                        })}
                        onClick={() => handleCategory(item.name)}
                      >
                        {item.name}
                      </span>
                      <span className="divider">|</span>
                    </React.Fragment>
                  )
                })}
              </dd>
            </dl>
          )
        })}
      </div>
      <div className="footer sprite_category_bg" />
    </PlaylistCategoryWrapper>
  )
}

export default memo(PlaylistCategory)
