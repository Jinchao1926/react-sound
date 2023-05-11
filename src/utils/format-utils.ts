
export function formatCount(count: number) {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万" // 保留一位小数
  } else {
    return Math.floor(count / 10000 / 1000) / 10 + "亿"
  }
}

export function formatSizedImage(imgUrl: string, size: number = 140) {
  return `${imgUrl}?param=${size}y${size}`
}