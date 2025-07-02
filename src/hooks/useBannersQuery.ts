import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'

/*
{
  "imageUrl": "http://p1.music.126.net/ujPJOXXmVjNshAIWOy51yg==/109951171388243717.jpg",
  "targetId": 0,
  "adid": null,
  "targetType": 3000,
  "titleColor": "blue",
  "typeTitle": "独家策划",
  "url": "https://y.music.163.com/g/yida/000891e4213b47de8722ca0016f244b7",
  "exclusive": false,
  "monitorImpress": null,
  "monitorClick": null,
  "monitorType": null,
  "monitorImpressList": null,
  "monitorClickList": null,
  "monitorBlackList": null,
  "extMonitor": null,
  "extMonitorInfo": null,
  "adSource": null,
  "adLocation": null,
  "adDispatchJson": null,
  "encodeId": "0",
  "program": null,
  "event": null,
  "video": null,
  "song": null,
  "scm": "1.music-homepage.homepage_banner_force.banner.15984943.597802312.null",
  "bannerBizType": "force_banner"
},
*/

export interface Banner {
  targetId: number
  imageUrl: string
  typeTitle: string
}

interface BannerResponse {
  banners: Banner[]
  code: number
}

export const BANNER_QUERY_KEY = ['banners'] as const

export const useBannersQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: BANNER_QUERY_KEY,
    queryFn: async () => {
      const { data } = await axios.get<BannerResponse>('/banner')
      return data.banners || []
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
