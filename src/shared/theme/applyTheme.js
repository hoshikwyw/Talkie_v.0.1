import { resolveBubbleStyle, resolveTheme } from './tokens'

/** `#ef8354` -> `239 131 84`, the format Tailwind's `<alpha-value>` needs. */
function hexToRgbTriplet(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.replace(/./g, (c) => c + c) : clean
  const int = Number.parseInt(full, 16)
  return `${(int >> 16) & 255} ${(int >> 8) & 255} ${int & 255}`
}

const toCssVar = (key) => `--c-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`

/**
 * Writes the active theme onto `<html>` as CSS variables.
 *
 * Theming happens entirely in CSS: React never re-renders on a theme change,
 * and no component needs to know a hex value.
 */
export function applyTheme({ themeName, bubbleStyle }) {
  if (typeof document === 'undefined') return

  const theme = resolveTheme(themeName)
  const bubble = resolveBubbleStyle(bubbleStyle)
  const root = document.documentElement

  for (const [key, hex] of Object.entries(theme.colors)) {
    root.style.setProperty(toCssVar(key), hexToRgbTriplet(hex))
  }

  root.style.setProperty('--bubble-radius-own', bubble.own)
  root.style.setProperty('--bubble-radius-other', bubble.other)

  // Lets the browser paint native UI (scrollbars, form controls) to match.
  root.style.colorScheme = 'dark'
}
