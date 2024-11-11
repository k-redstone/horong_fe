'use client'
import { useRouter } from 'next/navigation'

import { LEARN_CONSTANTS } from '@/constants/learn/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import RightArrowSVG from '@/static/svg/learn/learn-rightarrow-icon.svg'

function LastLearnListBtn({ wordId }: { wordId: number }) {
  const router = useRouter()
  const moveDetailRecord = () => {
    router.push(`/learn/${wordId}`)
  }

  const lang = useLangStore((state) => state.lang)
  return (
    <button
      onClick={moveDetailRecord}
      className="flex w-full items-center gap-x-5 rounded-3xl bg-grey-70 px-6 py-2 text-2xs text-text-md"
    >
      <div className="flex w-[25%] items-center justify-start">
        {LEARN_CONSTANTS[lang]['today-learn-last-header-word']}
      </div>
      <div className="flex w-[20%] items-center justify-start">
        {LEARN_CONSTANTS[lang]['today-learn-last-header-top']}
      </div>
      <div className="flex w-[20%] items-center justify-start">
        {LEARN_CONSTANTS[lang]['today-learn-last-header-count']}
      </div>
      <div className="flex-1">
        <RightArrowSVG className="h-5 w-5" />
      </div>
    </button>
  )
}

export default LastLearnListBtn
