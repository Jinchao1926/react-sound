import { Radio } from '@/types/djradio'

import { useRadiosQuery } from './useRadiosQuery'

/**
 * 推荐电台分类枚举
 * - MUSIC: 音乐播客
 * - LIFE: 生活
 * - EMOTION: 情感
 * - CREATION: 创作翻唱
 * - KNOWLEDGE: 知识
 */
const TOP_RADIO_CATEGORIES = {
  MUSIC: 2, // 音乐播客
  LIFE: 6, // 生活
  EMOTION: 3, // 情感
  CREATION: 2001, // 创作翻唱
  KNOWLEDGE: 11, // 知识
} as const

interface TopRadioCategory {
  categoryId: number
  categoryName: string
  djRadios: Radio[]
}

export const useTopRadioCategoriesQuery = () => {
  // create queries for each category
  const musicQuery = useRadiosQuery(TOP_RADIO_CATEGORIES.MUSIC)
  const lifeQuery = useRadiosQuery(TOP_RADIO_CATEGORIES.LIFE)
  const emotionQuery = useRadiosQuery(TOP_RADIO_CATEGORIES.EMOTION)
  const creationQuery = useRadiosQuery(TOP_RADIO_CATEGORIES.CREATION)
  const knowledgeQuery = useRadiosQuery(TOP_RADIO_CATEGORIES.KNOWLEDGE)

  const queries = [
    {
      query: musicQuery,
      categoryId: TOP_RADIO_CATEGORIES.MUSIC,
    },
    {
      query: lifeQuery,
      categoryId: TOP_RADIO_CATEGORIES.LIFE,
    },
    {
      query: emotionQuery,
      categoryId: TOP_RADIO_CATEGORIES.EMOTION,
    },
    {
      query: creationQuery,
      categoryId: TOP_RADIO_CATEGORIES.CREATION,
    },
    {
      query: knowledgeQuery,
      categoryId: TOP_RADIO_CATEGORIES.KNOWLEDGE,
    },
  ]

  // check loading and error states
  const isLoading = queries.some(({ query }) => query.isLoading)
  const isError = queries.some(({ query }) => query.isError)
  const error = queries.find(({ query }) => query.isError)?.query.error

  const topRadioCategories: TopRadioCategory[] = queries
    .filter(({ query }) => query.data?.length)
    .map(({ query, categoryId }) => ({
      categoryId,
      categoryName: query.data.length > 0 ? query.data[0].category : '',
      djRadios: query.data.slice(0, 4),
    }))

  return {
    data: topRadioCategories,
    isLoading,
    isError,
    error,
  }
}
