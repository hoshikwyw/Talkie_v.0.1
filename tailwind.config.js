/** @type {import('tailwindcss').Config} */

/**
 * Every colour resolves to a CSS variable written by `applyTheme`, so switching
 * themes never touches React. `<alpha-value>` keeps opacity modifiers working:
 * `bg-primary/20`, `border-muted/15`.
 */
const themed = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['"VT323"', 'monospace'],
      },
      colors: {
        canvas: themed('canvas'),
        surface: {
          DEFAULT: themed('surface'),
          light: themed('surface-light'),
        },
        primary: themed('primary'),
        accent: themed('accent'),
        content: themed('content'),
        muted: themed('muted'),
        danger: themed('danger'),
        online: themed('online'),
      },
      fontSize: {
        // The pixel face only stays legible at a handful of sizes — name them
        // so screens stop inventing one-off `text-[8px]` values.
        label: ['0.5rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'pixel-xs': ['0.5625rem', { lineHeight: '1.5', letterSpacing: '0.06em' }],
        'pixel-sm': ['0.625rem', { lineHeight: '1.6', letterSpacing: '0.05em' }],
        'pixel-md': ['0.75rem', { lineHeight: '1.6' }],
        'pixel-lg': ['1rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0, 0, 0, 0.3)',
        'pixel-sm': '2px 2px 0 0 rgba(0, 0, 0, 0.3)',
        'pixel-inset': 'inset 2px 2px 0 0 rgba(0, 0, 0, 0.15)',
        panel: '0 12px 32px -8px rgba(0, 0, 0, 0.55)',
        glow: '0 0 20px -2px rgb(var(--c-primary) / 0.35)',
      },
      borderWidth: {
        3: '3px',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        blink: 'blink 1s steps(2) infinite',
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.18s ease-out',
        'slide-in-left': 'slideInLeft 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
