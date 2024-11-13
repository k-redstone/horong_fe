'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar } from 'react-calendar'

import privateAPI from '@/api/privateAPI/index.ts'
import { LEARN_CONSTANTS } from '@/constants/learn/index.ts'
import LastLearnListBtn from '@/features/learn/components/lastListBtn/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import LearnRightArrowIcon from '@/static/svg/learn/learn-rightarrow-icon.svg'
import StampOffSVG from '@/static/svg/learn/learn-stamp-off-icon.svg'
import StampOnSVG from '@/static/svg/learn/learn-stamp-on-icon.svg'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
interface recordType {
  date: string
  educationRecordList: wordType[]
}

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
function LearnPage() {
  const [clickedDate, setClickedDate] = useState<Value>()
  const lang = useLangStore((state) => state.lang)

  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')

      return res.data.result
    },
  })

  const { data: stamp } = useQuery({
    queryKey: ['stamp'],
    queryFn: async () => {
      const res = await privateAPI.get('/education/stamps')

      return res.data
    },
  })

  //교육기록이 있는 날짜에 한해서만 클릭하면 밑에 보이게
  const { data: recordList } = useQuery({
    queryKey: ['record-list'],
    queryFn: async () => {
      const res = await privateAPI.get('/education/records')

      return res.data.result
    },
  })

  return (
    <div className="flex grow flex-col items-center gap-y-8 overflow-y-scroll px-5 py-8 text-sm text-text-high">
      {/* 오늘의 학습 */}
      <div className="flex w-full flex-col justify-center gap-y-4">
        <h3 className="w-full font-bold">
          {LEARN_CONSTANTS[lang]['today-learn-title']}
        </h3>

        <Link
          href="/learn/today"
          className="flex items-center justify-between gap-x-2 rounded-3xl bg-grey-70 px-6 py-4"
        >
          <div className="flex flex-1 flex-col justify-center gap-y-2">
            <h3 className="font-bold text-primary">
              {' '}
              {LEARN_CONSTANTS[lang]['today-learn-title']}
            </h3>
            <div className="whitespace-pre-line text-3xs">
              {' '}
              {LEARN_CONSTANTS[lang]['today-learn-content']}
            </div>
          </div>
          <LearnRightArrowIcon className="h-7 w-7" />
        </Link>
      </div>

      {/* 스탬프 */}
      <div className="flex w-full flex-col justify-center gap-y-4">
        <div className="flex flex-col gap-y-1 text-text-high">
          <h3 className="font-bold">
            {user?.nickname + LEARN_CONSTANTS[lang]['today-learn-stamp-title']}
          </h3>
          <p className="text-2xs">
            {LEARN_CONSTANTS[lang]['today-learn-stamp-content']}
          </p>
        </div>

        <div className="grid w-full grid-cols-5 place-items-center gap-y-2 rounded-3xl bg-grey-70 px-4 py-3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number) => (
            <div
              key={'stamp_' + i}
              className="relative"
            >
              {stamp?.result.length >= i + 1 ? (
                <>
                  <StampOnSVG />
                  <span className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-center text-3xs">
                    {new Date(stamp?.result[i]).toLocaleDateString('en', {
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </>
              ) : (
                <StampOffSVG />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 지난 학습 기록 */}
      <div className="flex w-full flex-col justify-center gap-y-3">
        <div className="flex flex-col gap-y-1 text-text-high">
          <h3 className="font-bold">
            {LEARN_CONSTANTS[lang]['today-learn-last-title']}
          </h3>
          <p className="text-2xs">
            {LEARN_CONSTANTS[lang]['today-learn-last-content']}
          </p>
        </div>

        <div className="h-[.0313rem] w-full bg-white bg-opacity-15" />

        {/* 캘린더 */}
        <div>
          <Calendar
            locale="en"
            onChange={setClickedDate}
            value={clickedDate}
            next2Label={null}
            prev2Label={null}
            tileClassName={({ date, view }) =>
              view === 'month' && clickedDate?.toString() === date.toString()
                ? 'text-primary font-bold'
                : ''
            }
            tileContent={({ date, view }) => {
              return (
                <div
                  className={`${
                    view === 'month' &&
                    recordList?.educationRecordList.some(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (record: any) => {
                        return (
                          new Date(record.date).toLocaleDateString('en', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }) ===
                          date.toLocaleDateString('en', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        )
                      },
                    )
                      ? 'block'
                      : 'invisible'
                  } flex w-full items-center justify-center`}
                >
                  <div className="my-2 h-1 w-1 rounded-full bg-primary" />
                </div>
              )
            }}
            calendarType="hebrew"
            formatDay={(locale, date) =>
              date.toLocaleDateString(locale, { day: 'numeric' })
            }
            formatShortWeekday={(locale, date) =>
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
            }
            formatMonthYear={(locale, date) => {
              const year = date.getFullYear()
              const month = date.toLocaleString(locale, { month: 'long' })

              return `${year}\n${month}`
            }}
            minDetail="month"
          />
        </div>
        {clickedDate && (
          <>
            <div className="h-[.0313rem] w-full bg-white bg-opacity-15" />

            {/* 캘린더 클릭에 따른 학습 기록 리스트 */}
            <div className="flex flex-col gap-y-3 px-1">
              <h3 className="flex items-center justify-center text-xs-bold text-text-md">
                {clickedDate?.toLocaleString('en', {
                  //시간 표시 안함 YYYY/MM/DD
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </h3>

              <div className="flex w-full flex-col items-center justify-center gap-y-1">
                {/* 헤더 */}
                <div className="flex w-full gap-x-5 px-6 py-1 text-2xs text-text-md">
                  <div className="w-[25%]">
                    {LEARN_CONSTANTS[lang]['today-learn-last-header-word']}
                  </div>
                  <div className="flex w-[20%] items-center">
                    {LEARN_CONSTANTS[lang]['today-learn-last-header-top']}
                  </div>
                  <div className="w-[20%]">
                    {LEARN_CONSTANTS[lang]['today-learn-last-header-count']}
                  </div>
                  <div className="flex-1" />
                </div>
                {/* 아이템 */}
                {recordList?.educationRecordList.map((record: recordType) => {
                  if (
                    new Date(record?.date).toLocaleString('en', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }) ===
                    clickedDate.toLocaleString('en', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  ) {
                    return (
                      <div
                        className="flex w-full flex-col items-center justify-between gap-y-1"
                        key={'last_learn_list_wrapper_' + record.date}
                      >
                        {record.educationRecordList.map(
                          (word: wordType, index: number) => (
                            <LastLearnListBtn
                              key={
                                'last_learn_list_btn_' +
                                record.date +
                                '_' +
                                word.word +
                                '_' +
                                index
                              }
                              word={word}
                            />
                          ),
                        )}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LearnPage
