import { create } from 'zustand'
import { fetchUser } from '@/services/userService'

/** The signed-in user's Firestore profile, hydrated from the auth listener. */
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false })

    try {
      set({ currentUser: await fetchUser(uid), isLoading: false })
    } catch (err) {
      console.error('fetchUserInfo failed:', err)
      set({ currentUser: null, isLoading: false })
    }
  },
}))
