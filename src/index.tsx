import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter } from 'react-router-dom'

import { Toast } from '@/components/Toast'
import { ToastProvider } from '@/components/Toast/ToastContext'

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
const root = createRoot(rootElement)

root.render(
  <HelmetProvider>
    <ToastProvider>
      <AxiosProvider>
        <QueryClientProvider>
          <HashRouter>
            <PlayerProvider>
              <App />
            </PlayerProvider>
          </HashRouter>
        </QueryClientProvider>
      </AxiosProvider>
      <Toast />
    </ToastProvider>
  </HelmetProvider>
)
