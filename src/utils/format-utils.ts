export function formatCount(count: number) {
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万' // 保留一位小数
  } else {
    return Math.floor(count / 10000 / 1000) / 10 + '亿'
  }
}

export function formatSizedImage(imgUrl: string, size: number = 140) {
  return `${imgUrl}?param=${size}y${size}`
}

export function padLeft(num: number): string {
  return num < 10 ? '0' + num : num + ''
}

export function formatMonthDay(timestamp: number) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${padLeft(month)}月${padLeft(day)}日`
}

export function formatMinuteSecond(timestamp: number) {
  const date = new Date(timestamp)
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${padLeft(minute)}:${padLeft(second)}`
}
