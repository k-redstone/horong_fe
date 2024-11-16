'use client'
import { useRef, useState } from 'react'

import { LEARN_CONSTANTS } from '@/constants/learn/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ArrowDownSVG from '@/static/svg/learn/learn-bottomarrow-icon.svg'
import PlaySVG from '@/static/svg/learn/learn-play-icon.svg'
import ArrowUpSVG from '@/static/svg/learn/learn-toparrow-icon.svg'

interface RecordType {
  id: number
  text: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  audio: string
}

function RecordDetailCollapseBtn({ record }: { record: RecordType }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const lang = useLangStore((state) => state.lang)

  const audioRef = useRef<HTMLAudioElement>(null)
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }
  return (
    <>
      {/* 텍스트 */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex w-full items-center justify-between rounded-3xl bg-grey-70 px-6 py-4"
      >
        <div className="flex items-center justify-between gap-x-4 text-2xs">
          <p className="text-text-high">
            {LEARN_CONSTANTS[lang]['word-record'] + ' ' + record.id}
          </p>
          <span
            className={`${record.cer < 50 ? 'text-warning' : record.cer < 80 ? 'text-[#f2d76b]' : record.cer < 100 ? 'text-[#ccf26b]' : 'text-primary'}`}
          >
            {record.cer}%
          </span>
        </div>

        <div>
          {isCollapsed ? (
            <ArrowUpSVG className="h-5 w-5" />
          ) : (
            <ArrowDownSVG className="h-5 w-5" />
          )}
        </div>
      </button>

      {isCollapsed && (
        <div className="flex w-full flex-col gap-y-4 rounded-3xl bg-grey-70 px-6 pb-5 pt-10">
          {/* 삭제 */}
          {/* <button
            onClick={deleteRecord}
            className="flex items-center justify-end gap-x-1"
          >
            <span className="text-2xs text-text-high">
              {LEARN_CONSTANTS[lang]['word-delete']}
            </span>
            <TranshSVG className="h-3 w-3" />
          </button> */}

          {/* 단어 */}
          <div className="flex items-center justify-center text-2xl text-text-high">
            {record.text.split('').map((char, index) => (
              <span
                // @이하림
                className={`${record.hypIdx.includes(index) && 'text-primary'} transition-colors duration-500 ease-in-out`}
                key={char + '__lecture__' + index}
              >
                {char}
              </span>
            ))}
          </div>

          {/* 발음 듣기 */}
          <button
            onClick={handlePlay}
            className="flex items-center justify-center gap-x-1 rounded-3xl border border-grey-60 py-2"
          >
            <span className="text-xs text-text-high">
              {LEARN_CONSTANTS[lang]['word-listen']}
            </span>
            <PlaySVG className="h-4 w-4" />
          </button>
          {/* 오디오 재생 */}
          <audio
            ref={audioRef}
            src={record.audio}
          />
        </div>
      )}
    </>
  )
}

export default RecordDetailCollapseBtn
