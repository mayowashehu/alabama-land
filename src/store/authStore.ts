import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,

  login: (token: string) => {
    set({ accessToken: token })
  },

  logout: () => {
    set({ accessToken: null })
  },

  isAuthenticated: () => {
    return get().accessToken !== null
  },
}))
