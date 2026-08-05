import { useState } from 'react'
import Avvvatars from 'avvvatars-react'
import { cn } from '@/shared/lib/cn'

/** Falls back to a generated shape avatar when there is no photo, or it 404s. */
const Avatar = ({ avatar, name, size = 40, online = false, className }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(avatar?.trim()) && !imageFailed

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div
        className="overflow-hidden rounded-full ring-2 ring-muted/20"
        style={{ width: size, height: size }}
      >
        {showImage ? (
          <img
            src={avatar}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Avvvatars value={name || 'user'} size={size} style="shape" />
        )}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-online ring-2 ring-surface"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default Avatar
