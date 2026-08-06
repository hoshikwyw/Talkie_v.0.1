import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'

// Bundled rather than fetched from Google Fonts: a packaged app has to render
// correctly with no network, and these two faces *are* the product's identity.
// Latin only — the other subsets are 20x the bytes for glyphs never shown.
import '@fontsource/press-start-2p/latin-400.css'
import '@fontsource/vt323/latin-400.css'

import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
