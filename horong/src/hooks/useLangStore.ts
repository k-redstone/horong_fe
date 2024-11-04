import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LangStore {
  lang: string
  setLang: (lang: string) => void
}

const useLangStore = create(
  persist<LangStore>(
    (set) => ({
      lang: 'CHINESE',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'langState' },
  ),
)

export default useLangStore
