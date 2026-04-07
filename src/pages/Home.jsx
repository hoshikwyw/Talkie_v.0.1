import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Chat from '../components/chat/Chat'
import Detail from '../components/detail/Detail'
import SideList from '../components/sidebar/SideList'
import ChatList from '../components/sidebar/ChatList'
import { useChatStore } from '../lib/chatStore'

const Home = () => {
  const { chatId } = useChatStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-surface-darker overflow-hidden">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - desktop */}
        <div className="hidden lg:flex w-[280px] flex-shrink-0 border-r-3 border-pixel-cream/10 bg-surface-dark">
          <div className="w-full">
            <SideList />
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-[300px] z-50 lg:hidden">
              <ChatList onClose={() => setMobileMenuOpen(false)} />
            </div>
          </>
        )}

        {/* Chat area */}
        <div className="flex-1 min-w-0">
          {chatId ? (
            <div className="h-full">
              <Chat onDetailToggle={() => setMobileDetailOpen(!mobileDetailOpen)} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
              <div className="pixel-card p-8 text-center">
                <h2 className="font-pixel text-sm text-pixel-orange text-shadow-pixel mb-4 animate-float">
                  WALKIE TALKIE
                </h2>
                <p className="font-body text-xl text-pixel-muted">
                  Select a conversation to start chatting
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <span className="w-2 h-2 bg-pixel-orange animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-pixel-yellow animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-pixel-purple animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel - desktop */}
        {chatId && (
          <div className="hidden md:flex w-[280px] flex-shrink-0 border-l-3 border-pixel-cream/10">
            <div className="w-full">
              <Detail />
            </div>
          </div>
        )}

        {/* Mobile detail overlay */}
        {mobileDetailOpen && chatId && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileDetailOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-[300px] z-50 md:hidden bg-surface-dark">
              <Detail />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
