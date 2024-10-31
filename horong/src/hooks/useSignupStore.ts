import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SignupStore {
  language: string
  setLanguage: (language: string) => void
  userId: string
  setUserId: (userId: string) => void
  password: string
  setPassword: (password: string) => void
  nickname: string
  setNickname: (nickname: string) => void
}

const useSignupStore = create(
  persist<SignupStore>(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      userId: '',
      setUserId: (userId) => set({ userId }),
      password: '',
      setPassword: (password) => set({ password }),
      nickname: '',
      setNickname: (nickname) => set({ nickname }),
    }),
    {
      name: 'signupState',
    },
  ),
)

export default useSignupStore
