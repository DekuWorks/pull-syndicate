import { App } from '@/app/App'
import { track } from '@/lib/analytics'
import '@/styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

track('page_view', { path: window.location.pathname })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
