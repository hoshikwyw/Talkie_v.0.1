import { IoIosClose, IoMdSearch } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import UserInfo from './UserInfo'
import AddUser from './AddUser'
import { useChatList } from '../../lib/hooks/useChatList'

const ChatList = ({ onClose }) => {
  const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()

  return (
    <div className="flex flex-col h-full bg-surface-dark">
      {/* Header */}
      <div className="p-4 border-b-3 border-pixel-cream/10 flex items-center justify-between">
        <h2 className="font-pixel text-[10px] text-pixel-orange text-shadow-pixel">MESSAGES</h2>
        {onClose && (
          <button onClick={onClose} className="pixel-btn-ghost !p-1">
            <IoIosClose size={28} />
          </button>
        )}
      </div>

      {/* Search + Add */}
      <div className="p-4 flex gap-2">
        <div className="flex items-center gap-2 pixel-input !p-0 !pl-3 flex-1">
          <IoMdSearch size={18} className="text-pixel-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none font-body text-base text-pixel-cream w-full py-2 pr-3 placeholder:text-pixel-muted/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setModalOpen(true)} className="pixel-btn-primary !px-2 !py-1">
          <IoAdd size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pixel-scrollbar">
        {chats.length === 0 && (
          <div className="text-center py-12 px-4">
            <span className="font-pixel text-[8px] text-pixel-muted">NO CHATS YET</span>
            <p className="font-body text-pixel-muted mt-2">Add a friend to get started!</p>
          </div>
        )}
        {chats.map((chat) => (
          <div
            key={chat?.chatId}
            onClick={() => { handleSelect(chat); onClose?.() }}
            className={`px-4 py-2 cursor-pointer border-b border-pixel-cream/5 transition-colors hover:bg-surface-light/50
              ${!chat?.isSeen ? 'bg-pixel-orange/10 border-l-3 border-l-pixel-orange' : ''}`}
          >
            <UserInfo
              name={chat?.user?.username}
              avatar={chat?.user?.profile || ''}
              lastMessage={chat?.lastMessage || ''}
              online={true}
            />
          </div>
        ))}
      </div>

      {modalOpen && <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />}
    </div>
  )
}

export default ChatList
