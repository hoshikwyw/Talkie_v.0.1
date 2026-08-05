import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { applyTheme } from './applyTheme'
import {
  BUBBLE_STYLES,
  DEFAULT_BUBBLE_STYLE,
  DEFAULT_THEME,
  THEMES,
  resolveTheme,
} from './tokens'

const STORAGE_KEY = 'talkie:prefs'
const LEGACY_STORAGE_KEY = 'talkie-prefs'

/**
 * The previous implementation persisted `{ ...get() }`, which serialised the
 * entire store — every theme definition and every action — into localStorage on
 * each change. Read the two fields we care about once, then drop the old key.
 */
function readLegacyPrefs() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return {}
    const { themeName, bubbleStyle } = JSON.parse(raw)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    return { themeName, bubbleStyle }
  } catch {
    return {}
  }
}

const legacy = readLegacyPrefs()

export const useThemeStore = create(
  persist(
    (set, get) => ({
      themeName: legacy.themeName ?? DEFAULT_THEME,
      bubbleStyle: legacy.bubbleStyle ?? DEFAULT_BUBBLE_STYLE,

      setTheme: (themeName) => set({ themeName }),
      setBubbleStyle: (bubbleStyle) => set({ bubbleStyle }),

      /** @deprecated see `legacyThemeShim`. */
      getTheme: () => legacyThemeShim(get().themeName),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ themeName, bubbleStyle }) => ({ themeName, bubbleStyle }),
    }
  )
)

// Keep the DOM in sync outside of React: a theme change is a CSS variable
// write, not a render. Runs once on import so there is no flash of the default.
applyTheme(useThemeStore.getState())
useThemeStore.subscribe(applyTheme)

/** Catalogue for the settings screen. */
export const themeCatalogue = THEMES
export const bubbleStyleCatalogue = BUBBLE_STYLES

/**
 * Raw hex values for the few places that cannot use a CSS variable — third
 * party components styled through props, e.g. toast containers.
 *
 * @deprecated Prefer Tailwind utilities backed by the theme variables.
 */
export const getThemeColors = () => resolveTheme(useThemeStore.getState().themeName).colors

/**
 * Legacy accessor kept so components still driving colour through inline
 * `style` props keep working while they are migrated to utility classes.
 *
 * @deprecated Being removed screen by screen. Use `bg-surface`, `text-muted`,
 * `border-muted/15` and friends instead of reading hex values in JS.
 */
export function legacyThemeShim(themeName) {
  const c = resolveTheme(themeName).colors
  return {
    bg: c.canvas,
    surface: c.surface,
    surfaceLight: c.surfaceLight,
    primary: c.primary,
    accent: c.accent,
    text: c.content,
    muted: c.muted,
  }
}
