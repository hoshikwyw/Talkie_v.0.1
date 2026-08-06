import { useEffect, useState } from 'react'
import { Network } from '@capacitor/network'

/**
 * Connectivity, via one API on both platforms — the plugin's web
 * implementation wraps `navigator.onLine` and the online/offline events.
 *
 * Optimistic in its initial value: assuming offline before the first reading
 * arrives would flash a warning banner on every launch.
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    let listener
    let cancelled = false

    Network.getStatus()
      .then(({ connected }) => {
        if (!cancelled) setIsOnline(connected)
      })
      .catch(() => {})

    Network.addListener('networkStatusChange', ({ connected }) => setIsOnline(connected))
      .then((handle) => {
        listener = handle
        // The listener may resolve after unmount; drop it immediately if so.
        if (cancelled) handle.remove()
      })
      .catch(() => {})

    return () => {
      cancelled = true
      listener?.remove()
    }
  }, [])

  return isOnline
}
