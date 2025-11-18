export const padLeft = (num: number): string => {
  return num < 10 ? '0' + num : num + ''
}

export const formatTime = (time: number) => {
  // 0.将毫秒转成秒
  time = time / 1000

  // 1.获取时间
  const minute = Math.floor(time / 60)
  const second = Math.floor(time) % 60

  // 2.拼接字符串
  return padLeft(minute) + ':' + padLeft(second)
}

export const formatYearMonthDay = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toISOString().split('T')[0]
}

export const formatMonthDay = (timestamp: number) => {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${padLeft(month)}月${padLeft(day)}日`
}

export const formatMinuteSecond = (timestamp: number) => {
  const date = new Date(timestamp)
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${padLeft(minute)}:${padLeft(second)}`
}
