import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesProvider from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesProvider />
  </StrictMode>,
)
