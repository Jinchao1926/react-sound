import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App'
import { AxiosProvider } from './providers/AxiosProvider'
import { QueryClientProvider } from './providers/QueryClientProvider'
import store from './store'

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
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </AxiosProvider>
  </QueryClientProvider>
)
