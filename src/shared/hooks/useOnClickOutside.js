import { useEffect } from 'react'

/** Calls `handler` on a pointer press outside `ref`, while `active`. */
export function useOnClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return

    const onPointerDown = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return
      handler(event)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [ref, handler, active])
}
