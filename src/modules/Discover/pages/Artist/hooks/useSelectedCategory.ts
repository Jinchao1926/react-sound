import {
  ArtistAreaEnum,
  ArtistTypeEnum,
} from '@/hooks/artist/useArtistListQuery'
import { useUrlParams } from '@/hooks/useUrlParams'

const artistTypes = [
  { type: ArtistTypeEnum.MALE, label: '男歌手' },
  { type: ArtistTypeEnum.FEMALE, label: '女歌手' },
  { type: ArtistTypeEnum.GROUP, label: '组合/乐队' },
]

const artistCategories = [
  {
    area: ArtistAreaEnum.ALL,
    label: '推荐',
    types: [{ type: ArtistTypeEnum.ALL, label: '歌手' }],
  },
  {
    area: ArtistAreaEnum.CHINESE,
    label: '华语',
    types: artistTypes,
  },
  {
    area: ArtistAreaEnum.WESTERN,
    label: '欧美',
    types: artistTypes,
  },
  {
    area: ArtistAreaEnum.JAPANESE,
    label: '日本',
    types: artistTypes,
  },
  {
    area: ArtistAreaEnum.KOREAN,
    label: '韩国',
    types: artistTypes,
  },
  {
    area: ArtistAreaEnum.OTHER,
    label: '其他',
    types: artistTypes,
  },
]

export const useSelectedCategory = () => {
  const queryParams = useUrlParams()
  const areaParam = queryParams.get('area')
  const typeParam = queryParams.get('type')

  const selectedArea = areaParam ? Number(areaParam) : ArtistAreaEnum.ALL
  const selectedType = typeParam ? Number(typeParam) : ArtistTypeEnum.ALL

  return {
    categories: artistCategories,
    selectedArea,
    selectedType,
  }
}
