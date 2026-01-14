import { describe, it, expect } from 'vitest'

import type {
  PlaylistCategoriesApiResponse,
  PlaylistSubcategory,
} from '@/types/playlist-category'

import { parsePlaylistCategories } from './playlistCategoriesParser'

describe('playlistCategoriesParser', () => {
  describe('parsePlaylistCategories', () => {
    const mockSubcategory1: PlaylistSubcategory = {
      name: '华语',
      resourceCount: 1000,
      imgId: 0,
      imgUrl: null,
      type: 0,
      category: 0,
      resourceType: 0,
      hot: true,
      activity: false,
    }

    const mockSubcategory2: PlaylistSubcategory = {
      name: '流行',
      resourceCount: 2000,
      imgId: 0,
      imgUrl: null,
      type: 0,
      category: 1,
      resourceType: 0,
      hot: true,
      activity: false,
    }

    const mockSubcategory3: PlaylistSubcategory = {
      name: '摇滚',
      resourceCount: 1500,
      imgId: 0,
      imgUrl: null,
      type: 0,
      category: 1,
      resourceType: 0,
      hot: false,
      activity: false,
    }

    it('should parse categories and subcategories correctly', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [mockSubcategory1, mockSubcategory2],
        categories: {
          '0': '语种',
          '1': '风格',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(2)

      // Check first category
      expect(result[0].id).toBe(0)
      expect(result[0].name).toBe('语种')
      expect(result[0].subcategories).toHaveLength(1)
      expect(result[0].subcategories[0].name).toBe('华语')

      // Check second category
      expect(result[1].id).toBe(1)
      expect(result[1].name).toBe('风格')
      expect(result[1].subcategories).toHaveLength(1)
      expect(result[1].subcategories[0].name).toBe('流行')
    })

    it('should handle multiple subcategories for one category', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [mockSubcategory2, mockSubcategory3],
        categories: {
          '1': '风格',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
      expect(result[0].name).toBe('风格')
      expect(result[0].subcategories).toHaveLength(2)
      expect(result[0].subcategories[0].name).toBe('流行')
      expect(result[0].subcategories[1].name).toBe('摇滚')
    })

    it('should handle empty subcategories array', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [],
        categories: {
          '0': '语种',
          '1': '风格',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(2)
      expect(result[0].subcategories).toEqual([])
      expect(result[1].subcategories).toEqual([])
    })

    it('should handle subcategory with no matching category', () => {
      const orphanSubcategory: PlaylistSubcategory = {
        name: '孤儿子类别',
        resourceCount: 100,
        imgId: 0,
        imgUrl: null,
        type: 0,
        category: 999, // Non-existent category
        resourceType: 0,
        hot: false,
        activity: false,
      }

      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [mockSubcategory1, orphanSubcategory],
        categories: {
          '0': '语种',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(0)
      expect(result[0].subcategories).toHaveLength(1)
      expect(result[0].subcategories[0].name).toBe('华语')
      // orphanSubcategory should not be added anywhere
    })

    it('should handle empty categories object', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [mockSubcategory1],
        categories: {},
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toEqual([])
    })

    it('should convert category ID from string to number', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [mockSubcategory1],
        categories: {
          '0': '语种',
          '10': '其他',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(0)
      expect(typeof result[0].id).toBe('number')
      expect(result[1].id).toBe(10)
      expect(typeof result[1].id).toBe('number')
    })

    it('should preserve subcategory properties', () => {
      const detailedSubcategory: PlaylistSubcategory = {
        name: '综艺',
        resourceCount: 465,
        imgId: 12345,
        imgUrl: 'https://example.com/image.jpg',
        type: 1,
        category: 4,
        resourceType: 2,
        hot: true,
        activity: true,
      }

      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [detailedSubcategory],
        categories: {
          '4': '主题',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result[0].subcategories[0]).toEqual(detailedSubcategory)
      expect(result[0].subcategories[0].resourceCount).toBe(465)
      expect(result[0].subcategories[0].hot).toBe(true)
      expect(result[0].subcategories[0].activity).toBe(true)
    })

    it('should handle complex real-world scenario', () => {
      const apiResponse: PlaylistCategoriesApiResponse = {
        all: mockSubcategory1,
        sub: [
          { ...mockSubcategory1, name: '华语', category: 0 },
          { ...mockSubcategory2, name: '欧美', category: 0 },
          { ...mockSubcategory3, name: '流行', category: 1 },
          { ...mockSubcategory1, name: '摇滚', category: 1 },
          { ...mockSubcategory2, name: '运动', category: 2 },
          { ...mockSubcategory3, name: '浪漫', category: 3 },
        ],
        categories: {
          '0': '语种',
          '1': '风格',
          '2': '场景',
          '3': '情感',
          '4': '主题',
        },
        code: 200,
      }

      const result = parsePlaylistCategories(apiResponse)

      expect(result).toHaveLength(5)

      // 语种: 2 subcategories
      expect(result[0].id).toBe(0)
      expect(result[0].name).toBe('语种')
      expect(result[0].subcategories).toHaveLength(2)

      // 风格: 2 subcategories
      expect(result[1].id).toBe(1)
      expect(result[1].name).toBe('风格')
      expect(result[1].subcategories).toHaveLength(2)

      // 场景: 1 subcategory
      expect(result[2].id).toBe(2)
      expect(result[2].name).toBe('场景')
      expect(result[2].subcategories).toHaveLength(1)

      // 情感: 1 subcategory
      expect(result[3].id).toBe(3)
      expect(result[3].name).toBe('情感')
      expect(result[3].subcategories).toHaveLength(1)

      // 主题: 0 subcategories (no sub with category: 4)
      expect(result[4].id).toBe(4)
      expect(result[4].name).toBe('主题')
      expect(result[4].subcategories).toHaveLength(0)
    })
  })
})
