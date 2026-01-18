export const roundToDecimal = (num: number, decimal: number): number => {
  if (decimal >= 1 || decimal <= 0) return num
  const rounded = Math.round(num / decimal) * decimal
  return parseFloat(rounded.toFixed(1))
}

export const formatPlayCount = (count: number): string | number => {
  if (count < 100000) {
    return count
  } else {
    return `${Math.floor(count / 10000)}万`
  }

  /*
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万' // 保留一位小数
  } else {
    return Math.floor(count / 10000 / 1000) / 10 + '亿'
  } */
}

export const formatSizedImage = (
  imgUrl: string,
  size: number = 140
): string => {
  return `${imgUrl}?param=${size}y${size}`
}

export const formatImage = (
  imgUrl: string,
  width: number = 140,
  height: number = 140
): string => {
  return `${imgUrl}?param=${width}y${height}`
}

export const getTrackUrl = (id: number): string => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
