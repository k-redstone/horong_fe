'use client'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef } from 'react'

import privateAPI from '@/api/privateAPI/index.ts'
import TodayProblem from '@/features/learn/components/todayProblem/index.tsx'
import CheckedIcon from '@/static/svg/learn/learn-checked-icon.svg'
import UncheckedIcon from '@/static/svg/learn/learn-unchecked-icon.svg'
interface TodayLearnType {
  id: number
  educationId: number
  language: string
  transWord: string
  transDefinition: string
  transExample1: string
  transExample2: string
  audio: string
  isSlang: boolean
  word: string
  pronunciation: string
}

interface wordType {
  education: {
    id: number
    word: string
    pronunciation: string
    definition: string
    example1: string
    example2: string
    audio: string
    day: number
    slang: boolean
  }
  isCompleted: boolean
}
function TodayLearn() {
  const { data } = useQuery({
    queryKey: ['today-learn'],
    queryFn: async () => {
      const res = await privateAPI.get('/education/today')

      return res.data.result
    },
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const snapNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: window.innerWidth,
        behavior: 'smooth',
      })
    }
  }
  const snapBefore = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -window.innerWidth,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [])
  return (
    <div className="flex grow flex-col gap-y-4 py-4">
      {/* 문항체크 */}
      <div className="flex w-full items-center justify-end gap-x-2 px-6">
        {data?.words.map((word: wordType) => (
          <Fragment key={word.education.id}>
            {word.isCompleted ? (
              <CheckedIcon className="h-4 w-4" />
            ) : (
              <UncheckedIcon className="h-4 w-4" />
            )}{' '}
          </Fragment>
        ))}
      </div>

      <div
        ref={containerRef}
        className="flex w-full grow snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {data?.translatedWords.map((translateWords: TodayLearnType) => (
          <TodayProblem
            snapNext={snapNext}
            snapBefore={snapBefore}
            key={translateWords.id}
            word={
              data.words.find(
                (word: wordType) => word.education.word === translateWords.word,
              ).education
            }
            translateWords={translateWords}
          />
        ))}
      </div>
    </div>
  )
}

export default TodayLearn
