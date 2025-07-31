import createStorage from './createStorages'

const localStorageAPI = createStorage(window.localStorage)

export const {
  setStorage,
  getStorage,
  removeStorage,
  hasStorage,
  clearTable,
  getTableKeys,
  getStorageInfo,
} = localStorageAPI
