/**
 * Compose storage key with optional table prefix
 * @param key - The key name
 * @param table - The table/namespace prefix
 * @returns Combined key name
 */
const composeKey = (key: string, table: string = ''): string =>
  table.length > 0 ? `${table}_${key}` : key

/**
 * Internal set method
 * @param key - The key name
 * @param value - The value to store
 * @returns Whether the operation was successful
 */
const set = <T = any>(key: string, value: T): boolean => {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch {
    return false
  }
}

/**
 * Internal get method
 * @param key - The key name
 * @returns Parsed value or null
 */
const get = <T = any>(key: string): T | null => {
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) {
      return null
    }
    return JSON.parse(serialized) as T
  } catch {
    return null
  }
}

/**
 * Internal remove method
 * @param key - The key name
 * @returns Whether the operation was successful
 */
const remove = (key: string): boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/**
 * Set storage value
 * @param key - The key name
 * @param value - The value to store
 * @param table - Optional table/namespace prefix
 * @returns Whether the operation was successful
 */
export const setStorage = <T = any>(
  key: string,
  value: T,
  table: string = ''
): boolean => {
  const finalKey = composeKey(key, table)
  return set(finalKey, value)
}

/**
 * Get storage value
 * @param key - The key name
 * @param table - Optional table/namespace prefix
 * @returns Stored value or null
 */
export const getStorage = <T = any>(
  key: string,
  table: string = ''
): T | null => {
  const finalKey = composeKey(key, table)
  return get<T>(finalKey)
}

/**
 * Remove storage value
 * @param key - The key name
 * @param table - Optional table/namespace prefix
 * @returns Whether the operation was successful
 */
export const removeStorage = (key: string, table: string = ''): boolean => {
  const finalKey = composeKey(key, table)
  return remove(finalKey)
}

/**
 * Check if storage value exists
 * @param key - The key name
 * @param table - Optional table/namespace prefix
 * @returns Whether the key exists
 */
export const hasStorage = (key: string, table: string = ''): boolean => {
  const finalKey = composeKey(key, table)
  return localStorage.getItem(finalKey) !== null
}

/**
 * Clear all data from specified table
 * @param table - The table/namespace prefix
 * @returns Number of items cleared
 */
export const clearTable = (table: string): number => {
  if (!table) {
    return 0
  }

  const prefix = `${table}_`
  const keysToRemove: string[] = []

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key)
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key))
    return keysToRemove.length
  } catch {
    return 0
  }
}

/**
 * Get all keys from specified table
 * @param table - The table/namespace prefix
 * @returns Array of key names
 */
export const getTableKeys = (table: string): string[] => {
  if (!table) {
    return []
  }

  const prefix = `${table}_`
  const keys: string[] = []

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        // Remove table prefix and return original key name
        keys.push(key.slice(prefix.length))
      }
    }
    return keys
  } catch {
    return []
  }
}

/**
 * Get storage usage information
 * @returns Storage usage details
 */
export const getStorageInfo = () => {
  try {
    let usedSpace = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = key ? localStorage.getItem(key) : null
      if (key && value) {
        usedSpace += key.length + value.length
      }
    }

    return {
      available: true,
      totalItems: localStorage.length,
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
