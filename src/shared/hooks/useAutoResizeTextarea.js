import { useLayoutEffect, useRef } from 'react'

/**
 * Grows a textarea with its content, up to `maxHeight`.
 *
 * Keyed off the value rather than the `input` event, which never fires when the
 * field is cleared in code — so after sending a multi-line message the box used
 * to stay tall with nothing in it.
 */
export function useAutoResizeTextarea(value, maxHeight = 120) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`
  }, [value, maxHeight])

  return ref
}
