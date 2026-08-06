import { useCallback, useEffect, useRef, useState } from 'react'

/** How close to the bottom still counts as "following the conversation". */
const PIN_THRESHOLD_PX = 80

/**
 * Keeps a scroll container pinned to the bottom as content arrives, but only
 * while the reader is already there — scrolling up to read history no longer
 * gets yanked back down by an incoming message.
 */
export function useStickyScroll(dependency) {
  const containerRef = useRef(null)
  const [isPinned, setIsPinned] = useState(true)

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const element = containerRef.current
    if (!element) return
    element.scrollTo({ top: element.scrollHeight, behavior })
  }, [])

  const handleScroll = useCallback(() => {
    const element = containerRef.current
    if (!element) return

    const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight
    setIsPinned(distanceFromBottom <= PIN_THRESHOLD_PX)
  }, [])

  useEffect(() => {
    if (isPinned) scrollToBottom('auto')
    // Following the conversation should not depend on `isPinned` changing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency, scrollToBottom])

  /*
   * Android resizes the WebView when the soft keyboard opens, which shortens
   * the container and leaves the latest message hidden above the fold. Same
   * handler covers a browser window resize.
   */
  useEffect(() => {
    if (!isPinned) return undefined

    const onResize = () => scrollToBottom('auto')
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isPinned, scrollToBottom])

  return { containerRef, isPinned, scrollToBottom, handleScroll }
}
