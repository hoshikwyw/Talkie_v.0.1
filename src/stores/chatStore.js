import { create } from 'zustand'
import { useUserStore } from './userStore'

const EMPTY_CHAT = {
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
}

/** The conversation currently open in the main panel. */
export const useChatStore = create((set) => ({
  ...EMPTY_CHAT,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser

    // `blocked` is missing on profiles written before the field existed, and
    // calling `.includes` on undefined threw when opening those conversations.
    const blockedByThem = user?.blocked?.includes(currentUser?.id) ?? false
    const blockedByUs = currentUser?.blocked?.includes(user?.id) ?? false

    set({
      chatId,
      // Someone who blocked us is not rendered at all.
      user: blockedByThem ? null : user,
      isCurrentUserBlocked: blockedByThem,
      isReceiverBlocked: !blockedByThem && blockedByUs,
    })
  },

  toggleReceiverBlocked: () => set((state) => ({ isReceiverBlocked: !state.isReceiverBlocked })),

  resetChat: () => set(EMPTY_CHAT),
}))
