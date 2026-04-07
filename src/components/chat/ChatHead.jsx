import { IoIosMore } from 'react-icons/io'
import Avatar from '../sidebar/Avatar'

const ChatHead = ({ name, avatar, onDetailToggle }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-surface border-b-3 border-pixel-cream/10">
      <div className="flex items-center gap-3">
        <Avatar avatar={avatar} name={name} size={36} online={true} />
        <div>
          <p className="font-body text-xl text-pixel-cream">{name}</p>
          <p className="font-body text-sm text-pixel-green">online</p>
        </div>
      </div>
      <button onClick={onDetailToggle} className="pixel-btn-ghost !p-2 md:hidden">
        <IoIosMore size={20} />
      </button>
    </div>
  )
}

export default ChatHead
