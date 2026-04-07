import { IoMdSearch } from 'react-icons/io'
import { IoAdd } from 'react-icons/io5'
import UserInfo from './UserInfo'
import AddUser from './AddUser'
import { useChatList } from '../../lib/hooks/useChatList'
import { useThemeStore } from '../../lib/themeStore'

const SideList = () => {
  const { chats, modalOpen, setModalOpen, searchTerm, setSearchTerm, handleSelect, currentUser } = useChatList()
  const { getTheme } = useThemeStore()
  const theme = getTheme()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4" style={{ borderBottom: `2px solid ${theme.muted}20` }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-pixel text-[10px] tracking-wider" style={{ color: theme.primary }}>MESSAGES</h2>
          <button onClick={() => setModalOpen(true)}
                  className="font-pixel text-[9px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ background: theme.primary, color: theme.bg }}>
            <IoAdd size={14} /> ADD
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3"
             style={{ background: theme.surfaceLight, border: `1px solid ${theme.muted}15` }}>
          <IoMdSearch size={18} style={{ color: theme.muted }} />
          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent outline-none font-body text-base w-full py-2.5"
            style={{ color: theme.text }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto pixel-scrollbar">
        {chats.length === 0 && (
          <div className="flex flex-col items-center py-12 px-4">
            <span className="font-pixel text-[8px]" style={{ color: theme.muted }}>NO CHATS YET</span>
            <span className="font-body mt-2" style={{ color: theme.muted }}>Add a friend to start!</span>
          </div>
        )}
        {chats.map((chat) => (
          <div
            key={chat?.chatId}
            onClick={() => handleSelect(chat)}
            className="px-4 py-2.5 cursor-pointer transition-colors"
            style={{
              borderBottom: `1px solid ${theme.muted}10`,
              borderLeft: !chat?.isSeen ? `3px solid ${theme.primary}` : '3px solid transparent',
              background: !chat?.isSeen ? `${theme.primary}10` : 'transparent',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `${theme.muted}15`}
            onMouseLeave={(e) => e.currentTarget.style.background = !chat?.isSeen ? `${theme.primary}10` : 'transparent'}
          >
            <UserInfo name={chat?.user?.username} avatar={chat?.user?.profile || ''} lastMessage={chat?.lastMessage || ''} online={true} />
          </div>
        ))}
      </div>

      {modalOpen && <AddUser setModalOpen={setModalOpen} currentUser={currentUser} />}
    </div>
  )
}

export default SideList
