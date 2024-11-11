import { ISSUE_CONSTANTS } from '@/constants/issue/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function IssueScrap() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-y-1 overflow-y-scroll text-text-high">
      {/* post card */}

      {/* 아이템이 없다는걸 가정 */}
      <h3 className="text-lg">{ISSUE_CONSTANTS[lang]['scrap-title']}</h3>
      <p className="text-xs">{ISSUE_CONSTANTS[lang]['scrap-content']}</p>
    </div>
  )
}

export default IssueScrap
