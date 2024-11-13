'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import RightArrowSVG from '@/static/svg/learn/learn-rightarrow-icon.svg'

interface wordType {
  word: string
  wordId: number
  educationRecordList: resultType[]
}

interface resultType {
  id: number
  text: string
  cer: number
  gtIdx: number[]
  hpyIdx: number[]
  audio: string
}
function LastLearnListBtn({ word }: { word: wordType }) {
  const [maxCer, setMaxCer] = useState<number>(0)
  const router = useRouter()
  const moveDetailRecord = () => {
    router.push(`/learn/${word.wordId}`)
  }

  useEffect(() => {
    const tempCer = word.educationRecordList.reduce((acc, cur) => {
      return acc > cur.cer ? acc : cur.cer
    }, 0)
    setMaxCer(tempCer)
  }, [word])

  return (
    <button
      onClick={moveDetailRecord}
      className="flex w-full items-center gap-x-5 rounded-3xl bg-grey-70 px-6 py-2 text-2xs text-text-md"
    >
      <div className="flex w-[25%] items-center justify-start">{word.word}</div>
      <div
        className={`${maxCer < 50 ? 'text-warning' : maxCer < 80 ? 'text-[#f2d76b]' : maxCer < 100 ? 'text-[#ccf26b]' : 'text-primary'} flex w-[20%] items-center justify-start`}
      >
        {maxCer}
      </div>
      <div className="flex w-[20%] items-center justify-start">
        {word.educationRecordList.length}
      </div>
      <div className="flex flex-1 items-center justify-end">
        <RightArrowSVG className="h-5 w-5" />
      </div>
    </button>
  )
}

export default LastLearnListBtn
