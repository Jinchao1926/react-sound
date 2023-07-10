import { rsRequest } from "@/services";

// 电台 - 分类
export function fetchRadioCategories() {
  return rsRequest.get({
    url: '/dj/catelist'
  })
}

// 电台 - 推荐
// type: 电台类型 , 数字 , 可通过/dj/catelist获取 , 对应关系为 id 对应
export function fetchRecommendedRadios(type: number) {
  return rsRequest.get({
    url: '/dj/recommend/type',
    params: {
      type
    }
  })
}

// 电台 - 类别热门电台（上升最快没有接口）
export function fetchHotRadios(cateId: number, offset: number, limit: number) {
  return rsRequest.get({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  })
}

// 推荐节目
export function fetchRecommendedPrograms(limit: number = 49) {
  return rsRequest.get({
    url: '/program/recommend',
    params: {
      limit
    }
  })
}

// 电台 - 节目榜
export function fetchRankedPrograms(limit: number = 49) {
  return rsRequest.get({
    url: '/dj/program/toplist',
    params: {
      limit
    }
  })
}