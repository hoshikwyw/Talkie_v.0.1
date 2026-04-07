import { IoMdSearch } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import UserInfo from './UserInfo'
import AddUser from './AddUser'
import { useChatList } from '../../lib/hooks/useChatList'

const SideList = () => {
  const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b-3 border-pixel-cream/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-pixel text-[10px] text-pixel-orange text-shadow-pixel tracking-wider">
            MESSAGES
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="pixel-btn-primary !text-[10px] !px-2 !py-1 flex items-center gap-1"
          >
            <IoAdd size={14} /> ADD
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 pixel-input !p-0 !pl-3">
          <IoMdSearch size={18} className="text-pixel-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent outline-none font-body text-base text-pixel-cream w-full py-2 pr-3 placeholder:text-pixel-muted/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto pixel-scrollbar">
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <span className="font-pixel text-[8px] text-pixel-muted text-center leading-relaxed">
              NO CHATS YET
            </span>
            <span className="font-body text-pixel-muted mt-2">Add a friend to start talking!</span>
          </div>
        )}
        {chats.map((chat) => (
          <div
            key={chat?.chatId}
            onClick={() => handleSelect(chat)}
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

      {/* Add user modal */}
      {modalOpen && <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />}
    </div>
  )
}

export default SideList
