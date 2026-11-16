import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Scroll-reveal sections are visible in the prerendered HTML. Before enabling
// the hide-until-scrolled behaviour, mark everything already on screen as seen
// (synchronously, before the next paint) so above-the-fold content never
// blinks out and back in, and so it stays eligible to be the LCP element.
function enableScrollReveal() {
  const vh = window.innerHeight
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < vh) el.classList.add('is-visible')
  })
  document.documentElement.classList.add('js-reveal')
}

// Production pages ship prerendered HTML (see scripts/prerender.mjs). Hydrating
// reuses those DOM nodes, so the first paint (and its LCP) is kept instead of
// being thrown away and rebuilt. Dev and unprerendered pages render normally.
if (container.hasChildNodes()) {
  enableScrollReveal()
  hydrateRoot(container, app)
} else {
  document.documentElement.classList.add('js-reveal')
  createRoot(container).render(app)
}
