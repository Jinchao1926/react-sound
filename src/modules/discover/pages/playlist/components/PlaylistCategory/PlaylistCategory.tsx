import React, { FC, memo } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { usePlaylistCategoriesQuery } from '@/hooks/playlist/usePlaylistCategoriesQuery'

import { PlaylistCategoryWrapper } from './PlaylistCategory.styles'

const PlaylistCategory: FC<{ category: string }> = ({
  category: currentCategory,
}) => {
  const { data: categories } = usePlaylistCategoriesQuery()

  return (
    <PlaylistCategoryWrapper>
      <div className="header sprite_category_bg">
        <div className="arrow sprite_icon" />
      </div>
      <div className="body sprite_category_bg">
        <div className="all">
          <NavLink className="sprite_button2" to={`/discover/playlist`}>
            全部风格
          </NavLink>
        </div>
        {categories.map((category, index) => (
          <dl key={category.id}>
            <dt>
              <i className={'sprite_icon2 icon icon' + index} />
              {category.name}
            </dt>
            <dd>
              {category.subcategories.map((item) => (
                <div className="item-wrapper" key={item.name}>
                  <NavLink
                    className={classNames('name', {
                      selected: currentCategory === item.name,
                    })}
                    to={`/discover/playlist?cat=${item.name}`}
                  >
                    {item.name}
                  </NavLink>
                  <span className="divider">|</span>
                </div>
              ))}
            </dd>
          </dl>
        ))}
      </div>
      <div className="footer sprite_category_bg" />
    </PlaylistCategoryWrapper>
  )
}

export default memo(PlaylistCategory)
