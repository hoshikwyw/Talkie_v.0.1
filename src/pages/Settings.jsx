import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { bubbleStyleCatalogue, themeCatalogue, useThemeStore } from '@/shared/theme'

/**
 * Swatch for a theme that is not currently active, so its colours cannot come
 * from the CSS variables — inline styles are the right tool here.
 */
const ThemeSwatch = ({ theme, active, onSelect }) => {
  const c = theme.colors

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="flex flex-col items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
      style={{
        background: c.surface,
        border: `2px solid ${active ? c.primary : `${c.muted}33`}`,
        boxShadow: active ? `0 0 20px ${c.primary}4d` : 'none',
      }}
    >
      <div className="flex gap-1.5">
        <span className="h-4 w-4 rounded-full" style={{ background: c.primary }} />
        <span className="h-4 w-4 rounded-full" style={{ background: c.accent }} />
        <span className="h-4 w-4 rounded-full" style={{ background: c.surfaceLight }} />
        <span className="h-4 w-4 rounded-full opacity-50" style={{ background: c.content }} />
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-full">
        <div className="flex-1" style={{ background: c.canvas }} />
        <div className="flex-1" style={{ background: c.surface }} />
        <div className="flex-1" style={{ background: c.primary }} />
      </div>

      <span
        className="font-pixel text-[7px] uppercase tracking-wider"
        style={{ color: active ? c.primary : c.muted }}
      >
        {theme.name}
      </span>
    </button>
  )
}

const BubbleSwatch = ({ style, active, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={active}
    className={`flex flex-col items-center gap-2.5 rounded-xl border-2 p-3 transition-all ${
      active
        ? 'border-primary bg-primary/15'
        : 'border-muted/20 bg-surface-light hover:border-muted/40'
    }`}
  >
    <div className="flex w-full flex-col gap-1.5">
      <div
        className="bubble--other max-w-[80%] border px-3 py-1.5 text-left"
        style={{ borderRadius: style.other }}
      >
        <span className="font-body text-sm text-content">Hey!</span>
      </div>
      <div
        className="bubble--own max-w-[80%] self-end border px-3 py-1.5 text-right"
        style={{ borderRadius: style.own }}
      >
        <span className="font-body text-sm text-content">Hello!</span>
      </div>
    </div>
    <span className={`font-pixel text-[7px] uppercase ${active ? 'text-primary' : 'text-muted'}`}>
      {style.name}
    </span>
  </button>
)

const PreviewMessage = ({ own = false, text, time }) => (
  <div className={`flex gap-2 ${own ? 'flex-row-reverse' : ''}`}>
    <div
      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center self-end rounded-sm font-pixel text-[6px] ${
        own ? 'bg-primary text-canvas' : 'border border-muted/30 bg-surface-light text-muted'
      }`}
    >
      {own ? 'U' : 'P'}
    </div>
    <div className={`flex flex-col ${own ? 'items-end' : 'items-start'}`}>
      <div className={`bubble !py-2 ${own ? 'bubble--own' : 'bubble--other'}`}>
        <p className="font-body text-base text-content">{text}</p>
      </div>
      <span className="mt-0.5 font-body text-[11px] text-muted">{time}</span>
    </div>
  </div>
)

const Settings = () => {
  const navigate = useNavigate()
  const { themeName, bubbleStyle, setTheme, setBubbleStyle } = useThemeStore()

  return (
    <div className="min-h-screen bg-canvas px-4 py-8">
      <div className="mx-auto max-w-lg">
        <header className="mb-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="icon-btn bg-surface-light text-content"
          >
            <IoArrowBack size={20} />
          </button>
          <h1 className="font-pixel text-pixel-md text-primary">Settings</h1>
        </header>

        <section className="mb-8">
          <h2 className="mb-4 font-pixel text-pixel-xs uppercase tracking-wider text-muted">
            Colour theme
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(themeCatalogue).map(([key, theme]) => (
              <ThemeSwatch
                key={key}
                theme={theme}
                active={key === themeName}
                onSelect={() => setTheme(key)}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-pixel text-pixel-xs uppercase tracking-wider text-muted">
            Chat bubble style
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(bubbleStyleCatalogue).map(([key, style]) => (
              <BubbleSwatch
                key={key}
                style={style}
                active={key === bubbleStyle}
                onSelect={() => setBubbleStyle(key)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-pixel text-pixel-xs uppercase tracking-wider text-muted">
            Live preview
          </h2>
          <div className="overflow-hidden rounded-xl border-2 border-muted/20 bg-canvas">
            <div className="flex items-center gap-3 border-b border-muted/20 bg-surface px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-pixel text-[8px] text-canvas">
                P
              </div>
              <div>
                <span className="font-body text-base text-content">PixelFriend</span>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-online" />
                  <span className="font-body text-xs text-online">online</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <PreviewMessage text="Hey! How are you?" time="2:30 PM" />
              <PreviewMessage own text="Great! Love the new theme!" time="2:31 PM" />
              <PreviewMessage text="Looking awesome! ✨" time="2:31 PM" />
            </div>

            <div className="flex items-center gap-2 border-t border-muted/20 bg-surface px-4 py-3">
              <div className="flex-1 rounded-xl bg-surface-light px-3 py-2">
                <span className="font-body text-sm text-muted">Type a message...</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                <span className="font-body text-sm text-canvas">➤</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings
