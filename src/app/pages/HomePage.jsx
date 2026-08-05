import { useCallback, useState } from 'react'
import ChatPanel from '@/features/chat/components/ChatPanel'
import ConversationDetail from '@/features/chat/components/ConversationDetail'
import ChatSidebar from '@/features/contacts/components/ChatSidebar'
import { useChatStore } from '@/stores/chatStore'
import { cn } from '@/shared/lib/cn'
import { useEscapeKey } from '@/shared/hooks/useEscapeKey'
import AppHeader from '../components/AppHeader'

const WelcomePanel = () => (
  <div className="flex h-full flex-col items-center justify-center bg-canvas px-4">
    <div className="panel p-8 text-center sm:p-10">
      <h2 className="mb-3 animate-float font-pixel text-pixel-md text-primary sm:text-pixel-lg">
        Walkie Talkie
      </h2>
      <p className="font-body text-lg text-muted sm:text-xl">
        Select a conversation to start chatting
      </p>
      <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
      </div>
    </div>
  </div>
)

/**
 * The application shell: conversation list, active conversation and detail
 * panel, collapsing into slide-overs as the viewport narrows.
 */
const HomePage = () => {
  const chatId = useChatStore((state) => state.chatId)
  const [menuOpen, setMenuOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  // The slide-overs could only be dismissed by clicking the backdrop.
  const closePanels = useCallback(() => {
    setMenuOpen(false)
    setDetailOpen(false)
  }, [])
  useEscapeKey(closePanels, menuOpen || detailOpen)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas">
      <AppHeader onMenuClick={() => setMenuOpen(true)} />

      <div className="relative flex flex-1 overflow-hidden">
        {/*
         * One sidebar instance serves both layouts: a fixed column from `lg`,
         * and the full-width list on small screens when nothing is open. It
         * used to be two separate components mounted at the same time.
         */}
        <aside
          className={cn(
            'flex-shrink-0 border-r border-muted/15 lg:block lg:w-[300px]',
            chatId ? 'hidden lg:block' : 'block w-full'
          )}
        >
          <ChatSidebar />
        </aside>

        {menuOpen && (
          <>
            <div className="backdrop lg:hidden" onClick={() => setMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] animate-slide-in-left shadow-panel lg:hidden">
              <ChatSidebar onClose={() => setMenuOpen(false)} />
            </div>
          </>
        )}

        <main className={cn('min-w-0 flex-1 flex-col', chatId ? 'flex' : 'hidden lg:flex')}>
          {chatId ? <ChatPanel onDetailToggle={() => setDetailOpen((open) => !open)} /> : <WelcomePanel />}
        </main>

        {chatId && (
          <aside className="hidden w-[280px] flex-shrink-0 border-l border-muted/15 bg-surface xl:block">
            <ConversationDetail />
          </aside>
        )}

        {detailOpen && chatId && (
          <>
            <div className="backdrop xl:hidden" onClick={() => setDetailOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[320px] animate-slide-in-right bg-surface shadow-panel xl:hidden">
              <ConversationDetail onClose={() => setDetailOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
