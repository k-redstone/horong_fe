import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import privateAPI from '@/api/privateAPI/index.ts'

interface LangStore {
  lang: string
  setLang: (lang: string) => void
  initLang: () => void
}

const useLangStore = create(
  persist<LangStore>(
    (set) => ({
      lang: 'ENGLISH',
      initLang: async () => {
        try {
          const res = await privateAPI.get('/user/language')
          if (res.status === 200) {
            set({ lang: res.data.result })
          }
        } catch {
          return
        }
      },
      setLang: (lang) => set({ lang }),
    }),
    { name: 'langState' },
  ),
)

export default useLangStore
