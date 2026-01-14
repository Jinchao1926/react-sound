/**
 * Calculates the display length of a string
 * (Chinese characters count as 2, English characters count as 1)
 */
export const getDisplayLength = (str: string): number => {
  let length = 0
  for (let i = 0; i < str.length; i++) {
    length += str.charCodeAt(i) > 255 ? 2 : 1
  }
  return length
}

/**
 * Slices a string by display length
 * (Chinese characters count as 2, English characters count as 1)
 */
export const sliceByDisplayLength = (
  str: string,
  maxLength: number
): string => {
  let length = 0
  for (let i = 0; i < str.length; i++) {
    length += str.charCodeAt(i) > 255 ? 2 : 1
    if (length > maxLength) {
      return str.slice(0, i)
    }
  }
  return str
}
