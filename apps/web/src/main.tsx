import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import './index.css'

import { configureConnection } from '@puzzlehq/sdk'
import { HashRouter } from 'react-router-dom'

configureConnection({
  dAppName: 'Aleo Playground',
  dAppDescription: 'Create and manage your own custom token.',
  dAppUrl: 'http://localhost:5173/',
  dAppIconURL: 'https://link.to/assets/your_logo.png',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
