import { IoIosClose, IoMdSearch } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import UserInfo from './UserInfo'
import AddUser from './AddUser'
import { useChatList } from '../../lib/hooks/useChatList'
import { useThemeStore } from '../../lib/themeStore'

const ChatList = ({ onClose }) => {
  const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex flex-col h-full" style={{ background: theme.surface }}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: `2px solid ${theme.muted}20` }}>
        <h2 className="font-pixel text-[10px]" style={{ color: theme.primary }}>MESSAGES</h2>
        {onClose && (
          <button onClick={onClose} className="p-1" style={{ color: theme.muted }}><IoIosClose size={28} /></button>
        )}
      </div>
      <div className="p-4 flex gap-2">
        <div className="flex items-center gap-2 rounded-xl px-3 flex-1"
             style={{ background: theme.surfaceLight, border: `1px solid ${theme.muted}15` }}>
          <IoMdSearch size={18} style={{ color: theme.muted }} />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none font-body text-base w-full py-2.5"
                 style={{ color: theme.text }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => setModalOpen(true)} className="px-3 rounded-xl" style={{ background: theme.primary, color: theme.bg }}>
          <IoAdd size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pixel-scrollbar">
        {chats.length === 0 && (
          <div className="text-center py-12"><span className="font-pixel text-[8px]" style={{ color: theme.muted }}>NO CHATS</span></div>
        )}
        {chats.map((chat) => (
          <div key={chat?.chatId} onClick={() => { handleSelect(chat); onClose?.() }}
               className="px-4 py-2.5 cursor-pointer transition-colors"
               style={{
                 borderBottom: `1px solid ${theme.muted}10`,
                 borderLeft: !chat?.isSeen ? `3px solid ${theme.primary}` : '3px solid transparent',
                 background: !chat?.isSeen ? `${theme.primary}10` : 'transparent',
               }}
               onMouseEnter={(e) => e.currentTarget.style.background = `${theme.muted}15`}
               onMouseLeave={(e) => e.currentTarget.style.background = !chat?.isSeen ? `${theme.primary}10` : 'transparent'}>
            <UserInfo name={chat?.user?.username} avatar={chat?.user?.profile || ''} lastMessage={chat?.lastMessage || ''} online={true} />
          </div>
        ))}
      </div>
      {modalOpen && <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />}
    </div>
  )
}

export default ChatList
