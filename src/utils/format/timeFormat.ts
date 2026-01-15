export const padLeft = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}

export const formatTime = (time: number): string => {
  // Convert milliseconds to seconds
  time = time / 1000

  // Get minute and second components
  const minute = Math.floor(time / 60)
  const second = Math.floor(time) % 60

  // Concatenate to formatted string
  return `${padLeft(minute)}:${padLeft(second)}`
}

export const formatYearMonthDay = (
  timestamp: number,
  format: 'dash' | 'dot' = 'dash'
): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (format === 'dot') {
    return `${year}.${month}.${day}`
  }
  return `${year}-${month}-${day}`

  // return date.toISOString().split('T')[0]
}

export const formatMonthDay = (timestamp: number): string => {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${padLeft(month)}月${padLeft(day)}日`
}

export const formatMinuteSecond = (
  timestamp: number,
  format: 'colon' | 'chinese' = 'colon'
): string => {
  const totalSeconds = Math.floor(timestamp / 1000)
  const minute = Math.floor(totalSeconds / 60)
  const second = totalSeconds % 60

  if (format === 'chinese') {
    return `${padLeft(minute)}分${padLeft(second)}秒`
  }

  return `${padLeft(minute)}:${padLeft(second)}`
}
