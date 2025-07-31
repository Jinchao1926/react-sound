import createStorage from './createStorages'

const sessionStorageAPI = createStorage(window.sessionStorage)

export const {
  setStorage,
  getStorage,
  removeStorage,
  hasStorage,
  clearTable,
  getTableKeys,
  getStorageInfo,
} = sessionStorageAPI
