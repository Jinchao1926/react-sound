// import { usePlaylistCategoriesQuery } from '@/hooks/playlist/usePlaylistCategoriesQuery'
import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedPlaylistCategory = () => {
  const queryParams = useUrlParams()
  const category = queryParams.get('cat')

  // const { data: categories } = usePlaylistCategoriesQuery()

  return {
    selectedCategory: category || '全部',
    // categories,
  }
}
