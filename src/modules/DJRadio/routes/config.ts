export const radioRoutePath = {
  discoverRadio: '/discover/djradio',
  discoverRadioRecommend: '/discover/djradio/recommend',
  discoverRadioRank: '/discover/djradio/rank',
  discoverRadioCategory: '/discover/djradio/category',
}

export const radioRouteBuilder = {
  discoverRadio: () => radioRoutePath.discoverRadio,
  discoverRadioRecommend: () => radioRoutePath.discoverRadioRecommend,
  discoverRadioRank: () => radioRoutePath.discoverRadioRank,
  discoverRadioCategory: (id: number) =>
    `${radioRoutePath.discoverRadioCategory}?id=${id}`,
}
