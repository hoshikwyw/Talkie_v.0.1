import Avvvatars from 'avvvatars-react'

const Avatar = ({ avatar, name, size = 40, online = false }) => {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="rounded-full overflow-hidden ring-2 ring-white/10"
        style={{ width: size, height: size }}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="object-cover w-full h-full" />
        ) : (
          <Avvvatars value={name || 'user'} size={size} style="shape" />
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black/50" />
      )}
    </div>
  )
}

export default Avatar
