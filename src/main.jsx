import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

const tree = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

const rootElement = document.getElementById('root')

// Prerendered pages (scripts/prerender.mjs) arrive with the app's HTML
// already inside #root, so React adopts that markup instead of throwing
// it away and rendering again. Any URL without a prerendered file gets
// the empty shell and is rendered from scratch.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree)
} else {
  createRoot(rootElement).render(tree)
}
