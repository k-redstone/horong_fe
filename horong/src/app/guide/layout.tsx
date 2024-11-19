'use client'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { GUIDE_CONSTANT } from '@/constants/guide/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function GuideLayout({ children }: { children: React.ReactNode }) {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex h-full w-full flex-col bg-grey-90">
      <GlobalHeader pageName={GUIDE_CONSTANT[lang]['guide-header']} />
      {children}
    </div>
  )
}

export default GuideLayout
