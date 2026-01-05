type StorageType = Storage

function createStorage(storage: StorageType) {
  const composeKey = (key: string, table: string = ''): string =>
    table.length > 0 ? `${table}_${key}` : key

  const set = <T = unknown>(key: string, value: T): boolean => {
    try {
      const serialized = JSON.stringify(value)
      storage.setItem(key, serialized)
      return true
    } catch {
      return false
    }
  }

  const get = <T = unknown>(key: string): T | null => {
    try {
      const serialized = storage.getItem(key)
      if (serialized === null) return null
      return JSON.parse(serialized) as T
    } catch {
      return null
    }
  }

  const remove = (key: string): boolean => {
    try {
      storage.removeItem(key)
      return true
    } catch {
      return false
    }
  }

  const has = (key: string): boolean => storage.getItem(key) !== null

  const setStorage = <T = unknown>(
    key: string,
    value: T,
    table: string = ''
  ): boolean => set(composeKey(key, table), value)

  const getStorage = <T = unknown>(key: string, table: string = ''): T | null =>
    get<T>(composeKey(key, table))

  const removeStorage = (key: string, table: string = ''): boolean =>
    remove(composeKey(key, table))

  const hasStorage = (key: string, table: string = ''): boolean =>
    has(composeKey(key, table))

  const clearTable = (table: string): number => {
    if (!table) return 0
    const prefix = `${table}_`
    const keysToRemove: string[] = []
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => storage.removeItem(key))
      return keysToRemove.length
    } catch {
      return 0
    }
  }

  const getTableKeys = (table: string): string[] => {
    if (!table) return []
    const prefix = `${table}_`
    const keys: string[] = []
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key && key.startsWith(prefix)) {
          keys.push(key.slice(prefix.length))
        }
      }
      return keys
    } catch {
      return []
    }
  }

  const getStorageInfo = () => {
    try {
      let usedSpace = 0
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        const value = key ? storage.getItem(key) : null
        if (key && value) {
          usedSpace += key.length + value.length
        }
      }
      return {
        available: true,
        totalItems: storage.length,
        usedSpace,
        usedSpaceKB: Math.round((usedSpace / 1024) * 100) / 100,
      }
    } catch {
      return {
        available: false,
        totalItems: 0,
        usedSpace: 0,
        usedSpaceKB: 0,
      }
    }
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    hasStorage,
    clearTable,
    getTableKeys,
    getStorageInfo,
  }
}

export default createStorage
