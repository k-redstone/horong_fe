'use client'
import GlobalFooterNav from '@/components/globalFooterNav/index.tsx'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { LEARN_CONSTANTS } from '@/constants/learn/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function LearnLayout({ children }: { children: React.ReactNode }) {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex h-full w-full flex-col">
      <GlobalHeader pageName={LEARN_CONSTANTS[lang]['learn-header']} />
      {children}

      <GlobalFooterNav />
    </div>
  )
}

export default LearnLayout
