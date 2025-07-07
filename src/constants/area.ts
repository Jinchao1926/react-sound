// Area Types
export type AreaCode = 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'

export interface Area {
  code: AreaCode
  name: string
}

// ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
export const areas: readonly Area[] = [
  {
    code: 'ALL',
    name: '全部',
  },
  {
    code: 'ZH',
    name: '华语',
  },
  {
    code: 'EA',
    name: '欧美',
  },
  {
    code: 'KR',
    name: '韩国',
  },
  {
    code: 'JP',
    name: '日本',
  },
] as const

export const DEFAULT_AREA: AreaCode = 'ALL'
