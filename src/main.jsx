import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.jsx'
import ServicePage from './pages/ServicePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { servicePages } from './content/site.js'
import { siteBase } from './siteBase.js'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import './styles.css'

const basePath = siteBase.replace(/^\/|\/$/g, '')
const route = window.location.pathname
  .split('/')
  .filter(Boolean)
  .filter((segment) => segment !== basePath)[0] || 'home'

function App() {
  useEffect(() => {
    let cleanup = () => {}
    let cancelled = false
    const start = () => {
      import('./effects.js').then(({ startExperience }) => {
        if (!cancelled) cleanup = startExperience()
      })
    }
    const id = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 650 }) : window.setTimeout(start, 200)
    return () => {
      cancelled = true
      window.cancelIdleCallback ? window.cancelIdleCallback(id) : window.clearTimeout(id)
      cleanup()
    }
  }, [])

  if (route === 'home') return <HomePage />
  if (route === 'sobre') return <AboutPage />
  if (route === 'contato') return <ContactPage />
  if (servicePages[route]) return <ServicePage slug={route} page={servicePages[route]} />
  return <HomePage />
}

createRoot(document.getElementById('root')).render(<App />)
