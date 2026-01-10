/**
 * Simple logging utility
 * Production: Only logs errors
 * Development: Logs all levels
 */

/* eslint-disable no-console */

const isDevelopment = import.meta.env.DEV

const logger = {
  error: (...args: unknown[]) => {
    if (isDevelopment || args[0]) {
      console.error(...args)
    }
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },

  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
}

export default logger
