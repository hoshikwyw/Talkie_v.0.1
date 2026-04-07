import { create } from "zustand";
import { fetchUser } from "./services/userService";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const user = await fetchUser(uid);
      set({ currentUser: user, isLoading: false });
    } catch (err) {
      console.error("fetchUserInfo error:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
