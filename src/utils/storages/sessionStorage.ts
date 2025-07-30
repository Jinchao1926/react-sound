import createStorage from './createStorage'

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
