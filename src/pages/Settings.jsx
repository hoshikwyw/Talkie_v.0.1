import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../lib/themeStore'
import { IoArrowBack } from 'react-icons/io5'

const BubblePreview = ({ bubbleStyle, theme, label, active, onClick }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-xl transition-all flex flex-col items-center gap-2"
    style={{
      background: active ? `${theme.primary}20` : theme.surfaceLight,
      border: `2px solid ${active ? theme.primary : theme.muted + '20'}`,
    }}
  >
    <div className="w-full flex flex-col gap-1.5">
      {/* Other bubble */}
      <div className={`px-3 py-1.5 text-left max-w-[80%] bg-gradient-to-br ${theme.bubbleOther} border ${theme.bubbleOtherBorder} ${bubbleStyle.other}`}>
        <span className="font-body text-sm" style={{ color: theme.text }}>Hey!</span>
      </div>
      {/* Own bubble */}
      <div className={`px-3 py-1.5 text-right max-w-[80%] self-end bg-gradient-to-br ${theme.bubbleOwn} border ${theme.bubbleOwnBorder} ${bubbleStyle.own}`}>
        <span className="font-body text-sm" style={{ color: theme.text }}>Hello!</span>
      </div>
    </div>
    <span className="font-pixel text-[7px]" style={{ color: active ? theme.primary : theme.muted }}>
      {label}
    </span>
  </button>
)

const Settings = () => {
  const navigate = useNavigate()
  const { themeName, bubbleStyle, setTheme, setBubbleStyle, getTheme, themes, bubbleStyles } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: theme.bg }}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl transition-colors"
                  style={{ background: theme.surfaceLight, color: theme.text }}>
            <IoArrowBack size={20} />
          </button>
          <h1 className="font-pixel text-sm" style={{ color: theme.primary }}>SETTINGS</h1>
        </div>

        {/* Theme selection */}
        <section className="mb-8">
          <h2 className="font-pixel text-[9px] mb-4 tracking-wider" style={{ color: theme.muted }}>
            COLOR THEME
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className="p-4 rounded-xl transition-all flex flex-col items-center gap-3"
                style={{
                  background: t.surface,
                  border: `2px solid ${key === themeName ? t.primary : t.muted + '20'}`,
                  boxShadow: key === themeName ? `0 0 20px ${t.primary}30` : 'none',
                }}
              >
                {/* Color dots */}
                <div className="flex gap-1.5">
                  <span className="w-4 h-4 rounded-full" style={{ background: t.primary }} />
                  <span className="w-4 h-4 rounded-full" style={{ background: t.accent }} />
                  <span className="w-4 h-4 rounded-full" style={{ background: t.surfaceLight }} />
                  <span className="w-4 h-4 rounded-full" style={{ background: t.text, opacity: 0.5 }} />
                </div>
                {/* Preview bar */}
                <div className="w-full h-2 rounded-full overflow-hidden flex">
                  <div className="flex-1" style={{ background: t.bg }} />
                  <div className="flex-1" style={{ background: t.surface }} />
                  <div className="flex-1" style={{ background: t.primary }} />
                </div>
                <span className="font-pixel text-[7px]" style={{ color: key === themeName ? t.primary : t.muted }}>
                  {t.name.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Bubble style selection */}
        <section className="mb-8">
          <h2 className="font-pixel text-[9px] mb-4 tracking-wider" style={{ color: theme.muted }}>
            CHAT BUBBLE STYLE
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(bubbleStyles).map(([key, style]) => (
              <BubblePreview
                key={key}
                bubbleStyle={style}
                theme={theme}
                label={style.name.toUpperCase()}
                active={key === bubbleStyle}
                onClick={() => setBubbleStyle(key)}
              />
            ))}
          </div>
        </section>

        {/* Live preview */}
        <section>
          <h2 className="font-pixel text-[9px] mb-4 tracking-wider" style={{ color: theme.muted }}>
            LIVE PREVIEW
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ background: theme.bg, border: `2px solid ${theme.muted}20` }}>
            {/* Fake chat head */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: theme.surface, borderBottom: `1px solid ${theme.muted}20` }}>
              <div className="w-8 h-8 rounded-sm flex items-center justify-center font-pixel text-[8px]"
                   style={{ background: theme.primary, color: theme.bg }}>P</div>
              <div>
                <span className="font-body text-base" style={{ color: theme.text }}>PixelFriend</span>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span className="font-body text-xs text-emerald-400">online</span></div>
              </div>
            </div>
            {/* Fake messages */}
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center font-pixel text-[6px] flex-shrink-0 self-end"
                     style={{ background: theme.surfaceLight, color: theme.muted, border: `1px solid ${theme.muted}30` }}>P</div>
                <div>
                  <div className={`px-3 py-2 bg-gradient-to-br ${theme.bubbleOther} border ${theme.bubbleOtherBorder} ${bubbleStyles[bubbleStyle]?.other}`}>
                    <p className="font-body text-base" style={{ color: theme.text }}>Hey! How are you?</p>
                  </div>
                  <span className="font-body text-[11px] mt-0.5 block" style={{ color: theme.muted }}>2:30 PM</span>
                </div>
              </div>
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center font-pixel text-[6px] flex-shrink-0 self-end"
                     style={{ background: theme.primary, color: theme.bg }}>U</div>
                <div className="flex flex-col items-end">
                  <div className={`px-3 py-2 bg-gradient-to-br ${theme.bubbleOwn} border ${theme.bubbleOwnBorder} ${bubbleStyles[bubbleStyle]?.own}`}>
                    <p className="font-body text-base" style={{ color: theme.text }}>Great! Love the new theme!</p>
                  </div>
                  <span className="font-body text-[11px] mt-0.5" style={{ color: theme.muted }}>2:31 PM</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center font-pixel text-[6px] flex-shrink-0 self-end"
                     style={{ background: theme.surfaceLight, color: theme.muted, border: `1px solid ${theme.muted}30` }}>P</div>
                <div>
                  <div className={`px-3 py-2 bg-gradient-to-br ${theme.bubbleOther} border ${theme.bubbleOtherBorder} ${bubbleStyles[bubbleStyle]?.other}`}>
                    <p className="font-body text-base" style={{ color: theme.text }}>Looking awesome! &#x2728;</p>
                  </div>
                  <span className="font-body text-[11px] mt-0.5 block" style={{ color: theme.muted }}>2:31 PM</span>
                </div>
              </div>
            </div>
            {/* Fake input */}
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: theme.surface, borderTop: `1px solid ${theme.muted}20` }}>
              <div className="flex-1 rounded-xl px-3 py-2" style={{ background: theme.surfaceLight }}>
                <span className="font-body text-sm" style={{ color: theme.muted }}>Type a message...</span>
              </div>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: theme.primary }}>
                <span className="font-body text-sm" style={{ color: theme.bg }}>&#x27A4;</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings
