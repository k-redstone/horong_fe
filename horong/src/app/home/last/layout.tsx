'use client'

import GlobalFooterNav from '@/components/globalFooterNav/index.tsx'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { HOME_CONSTANT } from '@/constants/home/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function HorongChatLogLayout({ children }: { children: React.ReactNode }) {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex h-full w-full flex-col">
      <GlobalHeader pageName={HOME_CONSTANT[lang]['home-log-header']} />
      {children}
      <GlobalFooterNav />
    </div>
  )
}

export default HorongChatLogLayout
