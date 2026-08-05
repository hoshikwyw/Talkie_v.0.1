/**
 * Design tokens.
 *
 * Colours are authored as hex here for readability and converted to `R G B`
 * triplets at runtime (see `applyTheme`) so Tailwind's `<alpha-value>` syntax
 * keeps working — `bg-primary/20`, `border-muted/15`, etc.
 *
 * Components must never import this file. Read the tokens through Tailwind
 * utilities (`bg-surface`, `text-muted`) so a theme swap is a single CSS
 * variable write instead of a re-render of the whole tree.
 */

/** Status colours shared by every theme unless a theme overrides them. */
const SEMANTIC = {
  danger: '#e94560',
  online: '#6bcb77',
}

/**
 * @typedef {Object} ThemeColors
 * @property {string} canvas        Page background, behind every surface.
 * @property {string} surface       Panels: navbar, sidebar, input bar.
 * @property {string} surfaceLight  Raised elements: inputs, menus, chips.
 * @property {string} primary       Brand accent — actions and highlights.
 * @property {string} accent        Secondary accent, decorative only.
 * @property {string} content       Primary text.
 * @property {string} muted         Secondary text, borders, icons.
 */

export const THEMES = {
  midnight: {
    name: 'Midnight',
    colors: {
      ...SEMANTIC,
      canvas: '#12121f',
      surface: '#1a1a2e',
      surfaceLight: '#252540',
      primary: '#ef8354',
      accent: '#f4d35e',
      content: '#e8e4d9',
      muted: '#6b6b80',
      bubbleOwnFrom: '#f97316',
      bubbleOwnTo: '#ea580c',
      bubbleOwnBorder: '#fb923c',
      bubbleOtherFrom: '#475569',
      bubbleOtherTo: '#334155',
      bubbleOtherBorder: '#64748b',
    },
  },
  sakura: {
    name: 'Sakura',
    colors: {
      ...SEMANTIC,
      canvas: '#1a1520',
      surface: '#231e2e',
      surfaceLight: '#2e2840',
      primary: '#e896b0',
      accent: '#f0c8a0',
      content: '#f0e6ee',
      muted: '#7a6b80',
      bubbleOwnFrom: '#f472b6',
      bubbleOwnTo: '#ec4899',
      bubbleOwnBorder: '#f472b6',
      bubbleOtherFrom: '#6b21a8',
      bubbleOtherTo: '#581c87',
      bubbleOtherBorder: '#9333ea',
    },
  },
  forest: {
    name: 'Forest',
    colors: {
      ...SEMANTIC,
      canvas: '#0f1a14',
      surface: '#162420',
      surfaceLight: '#1e3028',
      primary: '#6bcb77',
      accent: '#ffd93d',
      content: '#dce8dc',
      muted: '#5a7a60',
      bubbleOwnFrom: '#10b981',
      bubbleOwnTo: '#059669',
      bubbleOwnBorder: '#34d399',
      bubbleOtherFrom: '#44403c',
      bubbleOtherTo: '#292524',
      bubbleOtherBorder: '#78716c',
    },
  },
  ocean: {
    name: 'Ocean',
    colors: {
      ...SEMANTIC,
      canvas: '#0c1524',
      surface: '#121f35',
      surfaceLight: '#1a2d48',
      primary: '#4fc3f7',
      accent: '#81d4fa',
      content: '#dce8f0',
      muted: '#5a7a90',
      bubbleOwnFrom: '#06b6d4',
      bubbleOwnTo: '#0891b2',
      bubbleOwnBorder: '#22d3ee',
      bubbleOtherFrom: '#334155',
      bubbleOtherTo: '#1e293b',
      bubbleOtherBorder: '#64748b',
    },
  },
  ember: {
    name: 'Ember',
    colors: {
      ...SEMANTIC,
      canvas: '#1a120e',
      surface: '#261a14',
      surfaceLight: '#33221a',
      primary: '#ff6b35',
      accent: '#ffa726',
      content: '#f0e0d0',
      muted: '#8a6a5a',
      bubbleOwnFrom: '#ea580c',
      bubbleOwnTo: '#dc2626',
      bubbleOwnBorder: '#f97316',
      bubbleOtherFrom: '#44403c',
      bubbleOtherTo: '#292524',
      bubbleOtherBorder: '#57534e',
    },
  },
}

/**
 * Bubble shapes, expressed as raw `border-radius` shorthand so the choice is a
 * CSS variable rather than a Tailwind class string smuggled through JS.
 * Order: top-left, top-right, bottom-right, bottom-left.
 */
export const BUBBLE_STYLES = {
  modern: { name: 'Modern', own: '1rem 1rem 0.125rem 1rem', other: '1rem 1rem 1rem 0.125rem' },
  pixel: { name: 'Pixel', own: '0', other: '0' },
  cloud: { name: 'Cloud', own: '1.5rem', other: '1.5rem' },
  sharp: { name: 'Sharp', own: '0.5rem 0.5rem 0 0.5rem', other: '0.5rem 0.5rem 0.5rem 0' },
}

export const DEFAULT_THEME = 'midnight'
export const DEFAULT_BUBBLE_STYLE = 'modern'

export const resolveTheme = (name) => THEMES[name] ?? THEMES[DEFAULT_THEME]
export const resolveBubbleStyle = (name) => BUBBLE_STYLES[name] ?? BUBBLE_STYLES[DEFAULT_BUBBLE_STYLE]
