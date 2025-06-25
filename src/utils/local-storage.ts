function set(key: any, value: string) {
  const serialized = JSON.stringify(value)
  localStorage.setItem(key, serialized)
}

function get(key: string) {
  const serialized = localStorage.getItem(key)
  if (serialized) {
    return JSON.parse(serialized)
  }
  return null
}

export function setStorage(key: string, value: any, table: string = '') {
  const composeKey = table.length > 0 ? `${table}_${key}` : key
  set(composeKey, value)
}

export function getStorage(key: string, table: string = '') {
  const composeKey = table.length > 0 ? `${table}_${key}` : key
  return get(composeKey)
}
