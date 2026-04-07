import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Chat from '../components/chat/Chat'
import Detail from '../components/detail/Detail'
import SideList from '../components/sidebar/SideList'
import ChatList from '../components/sidebar/ChatList'
import { useChatStore } from '../lib/chatStore'
import { useThemeStore } from '../lib/themeStore'

const Home = () => {
  const { chatId, resetChat } = useChatStore()
  const { getTheme } = useThemeStore()
  const theme = getTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: theme.bg }}>
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - desktop only (lg+) */}
        <div className="hidden lg:block w-[300px] flex-shrink-0"
             style={{ background: theme.surface, borderRight: `1px solid ${theme.muted}15` }}>
          <SideList />
        </div>

        {/* Mobile/tablet sidebar overlay */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                 onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-[85vw] max-w-[320px] z-50 lg:hidden shadow-2xl"
                 style={{ background: theme.surface }}>
              <ChatList onClose={() => setMobileMenuOpen(false)} />
            </div>
          </>
        )}

        {/* Chat area — on mobile, full screen when chat selected */}
        <div className={`flex-1 min-w-0 ${chatId ? 'flex' : 'hidden sm:flex'} flex-col`}>
          {chatId ? (
            <Chat onDetailToggle={() => setMobileDetailOpen(!mobileDetailOpen)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-4"
                 style={{ background: theme.bg }}>
              <div className="text-center p-8 sm:p-10 rounded-xl"
                   style={{ background: theme.surface, border: `1px solid ${theme.muted}15` }}>
                <h2 className="font-pixel text-xs sm:text-sm mb-3 animate-float" style={{ color: theme.primary }}>
                  WALKIE TALKIE
                </h2>
                <p className="font-body text-lg sm:text-xl" style={{ color: theme.muted }}>
                  Select a conversation to start chatting
                </p>
                <div className="flex justify-center gap-2 mt-5">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.primary, animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.accent, animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.primary, animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: show chat list when no chat selected */}
        {!chatId && (
          <div className="flex-1 sm:hidden" style={{ background: theme.surface }}>
            <SideList />
          </div>
        )}

        {/* Detail panel - desktop only (xl+) */}
        {chatId && (
          <div className="hidden xl:block w-[280px] flex-shrink-0"
               style={{ background: theme.surface, borderLeft: `1px solid ${theme.muted}15` }}>
            <Detail />
          </div>
        )}

        {/* Detail overlay for mobile & tablet */}
        {mobileDetailOpen && chatId && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
                 onClick={() => setMobileDetailOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-[85vw] max-w-[320px] z-50 xl:hidden shadow-2xl"
                 style={{ background: theme.surface }}>
              <Detail />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
