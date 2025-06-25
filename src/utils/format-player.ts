export function formatTime(time: number) {
  // 0.将毫秒转成秒
  time = time / 1000

  // 1.获取时间
  const minute = Math.floor(time / 60)
  const second = Math.floor(time) % 60

  // 2.拼接字符串
  return padLeft(minute) + ':' + padLeft(second)
}

function padLeft(num: number): string {
  return num < 10 ? '0' + num : num + ''
}

export function roundToDecimal(num: number, decimal: number) {
  if (decimal >= 1 || decimal <= 0) return num
  const rounded = Math.round(num / decimal) * decimal
  return rounded.toFixed(1) as unknown as number
}

export function getMusicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
