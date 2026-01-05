import {
  type PlaylistCategoriesApiResponse,
  type PlaylistCategoryDetail,
} from '@/types/playlist-category'

export const parsePlaylistCategories = (
  apiResponse: PlaylistCategoriesApiResponse
): PlaylistCategoryDetail[] => {
  const { categories, sub } = apiResponse

  const categoryDetails: PlaylistCategoryDetail[] = Object.entries(
    categories
  ).map(([categoryId, categoryName]) => ({
    id: Number(categoryId),
    name: categoryName,
    subcategories: [],
  }))

  sub.forEach((subcategory) => {
    const categoryDetail = categoryDetails.find(
      (cat) => cat.id === subcategory.category
    )
    if (categoryDetail) {
      categoryDetail.subcategories.push(subcategory)
    }
  })

  return categoryDetails
}
