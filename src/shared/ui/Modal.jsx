import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'
import { cn } from '@/shared/lib/cn'
import { useEscapeKey } from '@/shared/hooks/useEscapeKey'
import IconButton from './IconButton'

/**
 * Portalled dialog. Replaces the hand-rolled backdrop-plus-fixed-wrapper
 * pattern that was copied per call site, and adds the parts those were missing:
 * Escape to dismiss, background scroll lock, and dialog semantics.
 */
const Modal = ({ open, onClose, title, children, className }) => {
  const panelRef = useRef(null)

  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'

    // Only take focus if the content has not already claimed it — otherwise
    // this runs after mount and steals it back from an autoFocus field.
    const panel = panelRef.current
    if (panel && !panel.contains(document.activeElement)) panel.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="backdrop z-0" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          'panel-raised relative z-10 w-full max-w-sm animate-slide-up p-5 outline-none',
          className
        )}
      >
        {title && (
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="font-pixel text-pixel-md text-primary text-shadow-pixel">{title}</h2>
            <IconButton label="Close dialog" onClick={onClose} className="-mr-1 -mt-1">
              <IoClose size={20} />
            </IconButton>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
