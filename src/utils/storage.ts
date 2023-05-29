export enum StorageTable {
  song = "song",
  lyric = "lyric",
  similarPlaylists = "similar_playlists",
  similarSongs = "similar_songs",
}

function set(key: any, value: string) {
  const serialized = JSON.stringify(value)
  sessionStorage.setItem(key, serialized)
}

function get(key: string) {
  const serialized = sessionStorage.getItem(key)
  if (serialized) {
    return JSON.parse(serialized)
  }
  return null
}

export function setStorage(key: string, value: any, table: StorageTable) {
  const composeKey = `${table}_${key}`
  set(composeKey, value)
}

export function getStorage(key: string, table: StorageTable) {
  const composeKey = `${table}_${key}`
  return get(composeKey)
}