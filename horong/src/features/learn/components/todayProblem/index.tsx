'use client'

import { useRef, useState } from 'react'

import { LEARN_CONSTANTS } from '@/constants/learn/index.ts'
import VoiceRecordBox from '@/features/learn/components/record/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import SpeakIcon from '@/static/svg/learn/learn-volume-icon.svg'

interface TranslateWordType {
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

interface ResponseType {
  audio: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  id: number
  text: string
}
function TodayProblem({
  translateWords,
  snapBefore,
  snapNext,
}: {
  translateWords: TranslateWordType
  snapBefore: () => void
  snapNext: () => void
}) {
  const [result, setResult] = useState<ResponseType | undefined>()
  const lang = useLangStore((state) => state.lang)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playPronunciation = () => {
    if (audioRef.current) {
      audioRef.current?.play()
    }
  }

  return (
    <div className="relative flex w-full shrink-0 snap-center snap-always flex-col items-center gap-y-4 px-6">
      {/* 뜻 컨테이너 */}
      <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-xl bg-grey-70 px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-y-1">
          <div className="flex items-center justify-center gap-x-2">
            <h3 className="text-xl text-text-high">{translateWords.word}</h3>

            <button onClick={playPronunciation}>
              <SpeakIcon className="h-4 w-4" />
            </button>

            <audio
              ref={audioRef}
              src={translateWords.audio}
            />
          </div>

          <span className="text-2xs text-text-high">
            [{translateWords.pronunciation}]
          </span>
        </div>

        <div className="whitespace-pre-line text-sm text-text-high">
          {translateWords.transDefinition}
        </div>

        <div className="flex w-full flex-col gap-y-1 text-2xs text-text-high">
          <h5 className="w-full text-start text-xs-bold">
            {LEARN_CONSTANTS[lang]['today-example-txt']}
          </h5>
          <p className="">{translateWords.transExample1}</p>
          <li className="list-outside list-disc">
            {translateWords.transExample1}
          </li>

          <p>{translateWords.transExample2}</p>
          <li className="list-outside list-disc">
            {translateWords.transExample2}
          </li>
        </div>
      </div>

      <div className="flex w-full items-center justify-center rounded-xl bg-grey-70 text-xs text-text-high">
        {result ? (
          <div className="flex flex-col gap-y-2 p-6">
            <div className="flex items-center justify-center gap-x-1 text-2xs">
              <span>{LEARN_CONSTANTS[lang]['today-cer-txt']} </span>
              <span>|</span>
              <span
                className={`${result.cer < 50 ? 'text-warning' : result.cer < 80 ? 'text-[#f2d76b]' : result.cer < 100 ? 'text-[#ccf26b]' : 'text-primary'} text-2xs-bold`}
              >
                {result.cer.toFixed(2) + '%'}
              </span>
            </div>
            <span className="flex flex-wrap items-center justify-center text-2xl">
              {' '}
              {result.text.split('').map((char, index) => (
                <span
                  className={`${result.hypIdx.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__result__' + index}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        ) : (
          <span className="py-10">
            {' '}
            {LEARN_CONSTANTS[lang]['today-result-txt']}{' '}
          </span>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-1 rounded-xl bg-grey-70 py-10 text-xs">
        <VoiceRecordBox
          setResult={setResult}
          word={translateWords.word}
        />
        <span>
          {result
            ? LEARN_CONSTANTS[lang]['today-again-mic-txt']
            : LEARN_CONSTANTS[lang]['today-mic-txt']}
        </span>
      </div>

      {/* scroll */}
      <div className="absolute bottom-10 flex w-full items-center justify-between px-6 pt-14 text-2xs text-text-high">
        <button
          onClick={snapBefore}
          className="text-xs-bold text-text-high"
        >
          {LEARN_CONSTANTS[lang]['today-move-before']}
        </button>
        <button
          onClick={snapNext}
          className="text-xs-bold text-text-high"
        >
          {LEARN_CONSTANTS[lang]['today-move-next']}
        </button>
      </div>
    </div>
  )
}

export default TodayProblem
