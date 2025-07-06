/*
{
    "name": "综艺",
    "resourceCount": 465,
    "imgId": 0,
    "imgUrl": null,
    "type": 0,
    "category": 4,
    "resourceType": 0,
    "hot": true,
    "activity": false
} */
export interface PlaylistSubcategory {
  name: string
  resourceCount: number
  imgId: number
  imgUrl: string | null
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}

/*
{
  "0": "语种",
  "1": "风格",
  "2": "场景",
  "3": "情感",
  "4": "主题"
}*/
export type PlaylistCategoryMap = Record<string, string>

export interface PlaylistCategoryDetail {
  id: number
  name: string
  subcategories: PlaylistSubcategory[]
}

export interface PlaylistCategoriesApiResponse {
  all: PlaylistSubcategory
  sub: PlaylistSubcategory[]
  categories: PlaylistCategoryMap
  code: number
}
