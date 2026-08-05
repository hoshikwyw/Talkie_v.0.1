import { Suspense, lazy } from 'react'

// ~270 kB of emoji data — kept out of the initial bundle.
const EmojiPicker = lazy(() => import('emoji-picker-react'))

/**
 * Anchored to the composer with plain CSS.
 *
 * This used to be a fixed-position element whose coordinates were read from
 * `getBoundingClientRect()` *during render* — a layout read in the render
 * phase, and stale the moment anything scrolled or resized.
 */
const EmojiPickerPopover = ({ onSelect }) => (
  <div className="absolute bottom-full left-0 right-0 z-50 mb-2 overflow-hidden rounded-2xl border border-muted/20 shadow-panel sm:right-auto sm:w-[320px]">
    <Suspense
      fallback={
        <div className="flex h-[300px] items-center justify-center bg-surface-light font-body text-muted">
          Loading emojis...
        </div>
      }
    >
      <EmojiPicker
        onEmojiClick={onSelect}
        theme="dark"
        width="100%"
        height={320}
        searchDisabled
        skinTonesDisabled
        previewConfig={{ showPreview: false }}
        lazyLoadEmojis
      />
    </Suspense>
  </div>
)

export default EmojiPickerPopover
