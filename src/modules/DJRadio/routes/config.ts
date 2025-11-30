export const radiorRoutePath = {
  discoverRadio: '/discover/djradio',
  discoverRadioRecommend: '/discover/djradio/recommend',
  discoverRadioRank: '/discover/djradio/rank',
  discoverRadioCategory: '/discover/djradio/category',
}

export const radioRouteBuilder = {
  discoverRadio: () => radiorRoutePath.discoverRadio,
  discoverRadioRecommend: () => radiorRoutePath.discoverRadioRecommend,
  discoverRadioRank: () => radiorRoutePath.discoverRadioRank,
  discoverRadioCategory: (id: number) =>
    `${radiorRoutePath.discoverRadioCategory}?id=${id}`,
}
