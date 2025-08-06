import React from 'react'

import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { App } from './App'
import { AxiosProvider } from './providers/AxiosProvider'
import { PlayerProvider } from './providers/PlayerProvider'
import { QueryClientProvider } from './providers/QueryClientProvider'

import 'normalize.css'
import '@/assets/css/index.less'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(rootElement)

root.render(
  <QueryClientProvider>
    <AxiosProvider>
      <HashRouter>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </HashRouter>
    </AxiosProvider>
  </QueryClientProvider>
)
