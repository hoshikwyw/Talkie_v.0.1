import { IoCloudOfflineOutline } from 'react-icons/io5'
import { useNetworkStatus } from '@/shared/platform/useNetworkStatus'

/**
 * Messages still send while offline — they queue in the local cache and replay
 * on reconnect — but nothing on screen would say so, and a message that looks
 * sent but has not left the device is worth being honest about.
 */
const OfflineBanner = () => {
  const isOnline = useNetworkStatus()
  if (isOnline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 bg-danger/20 px-4 py-1.5 text-center"
    >
      <IoCloudOfflineOutline size={16} className="flex-shrink-0 text-danger" />
      <span className="font-body text-base text-content">
        Offline — messages will send when you reconnect
      </span>
    </div>
  )
}

export default OfflineBanner
