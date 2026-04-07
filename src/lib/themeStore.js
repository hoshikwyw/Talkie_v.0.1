import { create } from "zustand"

const THEMES = {
  midnight: {
    name: "Midnight",
    bg: "#12121f",
    surface: "#1a1a2e",
    surfaceLight: "#252540",
    primary: "#ef8354",
    accent: "#f4d35e",
    text: "#e8e4d9",
    muted: "#6b6b80",
    bubbleOwn: "from-orange-500/25 to-orange-600/15",
    bubbleOther: "from-slate-600/30 to-slate-700/20",
    bubbleOwnBorder: "border-orange-400/30",
    bubbleOtherBorder: "border-slate-500/20",
  },
  sakura: {
    name: "Sakura",
    bg: "#1a1520",
    surface: "#231e2e",
    surfaceLight: "#2e2840",
    primary: "#e896b0",
    accent: "#f0c8a0",
    text: "#f0e6ee",
    muted: "#7a6b80",
    bubbleOwn: "from-pink-400/25 to-pink-500/15",
    bubbleOther: "from-purple-800/30 to-purple-900/20",
    bubbleOwnBorder: "border-pink-400/30",
    bubbleOtherBorder: "border-purple-600/20",
  },
  forest: {
    name: "Forest",
    bg: "#0f1a14",
    surface: "#162420",
    surfaceLight: "#1e3028",
    primary: "#6bcb77",
    accent: "#ffd93d",
    text: "#dce8dc",
    muted: "#5a7a60",
    bubbleOwn: "from-emerald-500/25 to-emerald-600/15",
    bubbleOther: "from-stone-700/30 to-stone-800/20",
    bubbleOwnBorder: "border-emerald-400/30",
    bubbleOtherBorder: "border-stone-500/20",
  },
  ocean: {
    name: "Ocean",
    bg: "#0c1524",
    surface: "#121f35",
    surfaceLight: "#1a2d48",
    primary: "#4fc3f7",
    accent: "#81d4fa",
    text: "#dce8f0",
    muted: "#5a7a90",
    bubbleOwn: "from-cyan-500/25 to-cyan-600/15",
    bubbleOther: "from-slate-700/30 to-slate-800/20",
    bubbleOwnBorder: "border-cyan-400/30",
    bubbleOtherBorder: "border-slate-500/20",
  },
  ember: {
    name: "Ember",
    bg: "#1a120e",
    surface: "#261a14",
    surfaceLight: "#33221a",
    primary: "#ff6b35",
    accent: "#ffa726",
    text: "#f0e0d0",
    muted: "#8a6a5a",
    bubbleOwn: "from-orange-600/25 to-red-600/15",
    bubbleOther: "from-stone-700/30 to-stone-800/20",
    bubbleOwnBorder: "border-orange-500/30",
    bubbleOtherBorder: "border-stone-600/20",
  },
}

const BUBBLE_STYLES = {
  modern: {
    name: "Modern",
    own: "rounded-2xl rounded-br-sm",
    other: "rounded-2xl rounded-bl-sm",
  },
  pixel: {
    name: "Pixel",
    own: "rounded-none",
    other: "rounded-none",
  },
  cloud: {
    name: "Cloud",
    own: "rounded-3xl",
    other: "rounded-3xl",
  },
  sharp: {
    name: "Sharp",
    own: "rounded-lg rounded-br-none",
    other: "rounded-lg rounded-bl-none",
  },
}

const saved = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("talkie-prefs") || "{}") : {}

export const useThemeStore = create((set, get) => ({
  themeName: saved.themeName || "midnight",
  bubbleStyle: saved.bubbleStyle || "modern",

  get theme() {
    return THEMES[get().themeName] || THEMES.midnight
  },

  getTheme: () => THEMES[get().themeName] || THEMES.midnight,
  getBubble: () => BUBBLE_STYLES[get().bubbleStyle] || BUBBLE_STYLES.modern,

  setTheme: (name) => {
    set({ themeName: name })
    localStorage.setItem("talkie-prefs", JSON.stringify({ ...get(), themeName: name }))
  },
  setBubbleStyle: (style) => {
    set({ bubbleStyle: style })
    localStorage.setItem("talkie-prefs", JSON.stringify({ ...get(), bubbleStyle: style }))
  },

  themes: THEMES,
  bubbleStyles: BUBBLE_STYLES,
}))
