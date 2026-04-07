/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['"VT323"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#2a2a3d',
          light: '#363650',
          dark: '#1e1e2f',
          darker: '#161625',
        },
        pixel: {
          orange: '#ef8354',
          yellow: '#f4d35e',
          purple: '#8d6b94',
          pink: '#e07b9b',
          blue: '#5b8fb9',
          green: '#7ec8a0',
          red: '#e94560',
          cream: '#f0ead6',
          muted: '#8888a0',
        },
      },
      boxShadow: {
        pixel: '4px 4px 0px 0px rgba(0,0,0,0.3)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,0.3)',
        'pixel-lg': '6px 6px 0px 0px rgba(0,0,0,0.3)',
        'pixel-inset': 'inset 2px 2px 0px 0px rgba(0,0,0,0.15)',
        'glow-orange': '0 0 15px rgba(239,131,84,0.3)',
        'glow-purple': '0 0 15px rgba(141,107,148,0.3)',
      },
      borderWidth: {
        3: '3px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pixel-blink': 'pixelBlink 1s steps(2) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pixelBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        pixelcozy: {
          "primary": "#ef8354",
          "primary-content": "#1e1e2f",
          "secondary": "#8d6b94",
          "secondary-content": "#f0ead6",
          "accent": "#f4d35e",
          "accent-content": "#1e1e2f",
          "neutral": "#2a2a3d",
          "neutral-content": "#f0ead6",
          "base-100": "#1e1e2f",
          "base-200": "#2a2a3d",
          "base-300": "#363650",
          "base-content": "#f0ead6",
          "info": "#5b8fb9",
          "success": "#7ec8a0",
          "warning": "#f4d35e",
          "error": "#e94560",
        },
      },
    ],
  },
  plugins: [
    daisyui,
  ],
}
