import { router } from '@/app/router'
import { AppProviders } from '@/app/providers'
import { RouterProvider } from 'react-router-dom'

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
