import { SiteShell } from '@/components/layout/SiteShell'
import { AboutPage } from '@/pages/AboutPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { ContactPage } from '@/pages/ContactPage'
import { EventsPage } from '@/pages/EventsPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ShopPlaceholderPage } from '@/pages/ShopPlaceholderPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'shop', element: <ShopPlaceholderPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
