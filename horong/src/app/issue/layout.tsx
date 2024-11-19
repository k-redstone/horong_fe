'use client'
import GlobalFooterNav from '@/components/globalFooterNav/index.tsx'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { ISSUE_CONSTANTS } from '@/constants/issue/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function IssueLayout({ children }: { children: React.ReactNode }) {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex h-full w-full flex-col">
      <GlobalHeader pageName={ISSUE_CONSTANTS[lang]['issue-header']} />
      {children}

      <GlobalFooterNav />
    </div>
  )
}

export default IssueLayout
