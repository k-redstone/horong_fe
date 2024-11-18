'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import { fetchAllChatLog } from '@/features/home/api/chatlog.ts'
import {
  AllChatLogPromise,
  GroupedData,
} from '@/features/home/types/chatlogType.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function groupChatsByDate(data: AllChatLogPromise[]): GroupedData {
  const currentDate = new Date()
  const yesterday = new Date(currentDate)
  yesterday.setDate(currentDate.getDate() - 1)
  const sevenDaysAgo = new Date(currentDate)
  sevenDaysAgo.setDate(currentDate.getDate() - 7)

  // 결과 객체 초기화
  const groups: GroupedData = {
    today: [],
    yesterday: [],
    week: [],
    older: [],
  }

  // 각 메시지의 날짜 그룹을 확인하는 함수
  const getDateGroup = (createdAt: string): keyof GroupedData => {
    const createdDate = new Date(createdAt)

    if (createdDate.toDateString() === currentDate.toDateString()) {
      return 'today'
    } else if (createdDate.toDateString() === yesterday.toDateString()) {
      return 'yesterday'
    } else if (createdDate >= sevenDaysAgo && createdDate <= currentDate) {
      return 'week'
    } else {
      return 'older'
    }
  }

  // 데이터 그룹화
  data.forEach((room) => {
    const lastChatContent =
      room.chatContentList[room.chatContentList.length - 1]
    const groupKey = getDateGroup(lastChatContent.createdAt)
    groups[groupKey].push({
      ...room.chatContentList[room.chatContentList.length - 1],
      roomId: room.roomId,
    })
  })

  return groups
}

function HorongChatLogPage() {
  const lang = useLangStore((state) => state.lang)
  const [groupedData, setGroupedData] = useState<GroupedData>({
    today: [],
    yesterday: [],
    week: [],
    older: [],
  })
  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ['horongLog'],
    queryFn: fetchAllChatLog,
  })

  useEffect(() => {
    if (isSuccess) {
      setGroupedData(groupChatsByDate(data))
    }
  }, [data])

  return (
    <div className="flex h-full flex-col gap-y-6 px-6 py-8">
      {isSuccess && (
        <>
          <div className="flex h-[calc(100dvh-18.5rem)] flex-col gap-y-6 overflow-y-scroll">
            {groupedData.today.length > 0 && (
              <div className="flex flex-col gap-y-3 text-sm">
                <p className="text-text-md">
                  {HOME_CONSTANT[lang]['home-log-today-txt']}
                </p>
                {groupedData.today.map((item) => (
                  <Link
                    className="line-clamp-2"
                    href={`/home/last/${item.roomId}`}
                    key={crypto.randomUUID()}
                  >
                    {item.content}
                  </Link>
                ))}
              </div>
            )}
            {groupedData.yesterday.length > 0 && (
              <div className="flex flex-col gap-y-3 text-sm">
                <p className="text-text-md">
                  {HOME_CONSTANT[lang]['home-log-yesterday-txt']}
                </p>
                {groupedData.yesterday.map((item) => (
                  <Link
                    className="line-clamp-2"
                    href={`/home/last/${item.roomId}`}
                    key={crypto.randomUUID()}
                  >
                    {item.content}
                  </Link>
                ))}
              </div>
            )}
            {groupedData.week.length > 0 && (
              <div className="flex flex-col gap-y-3 text-sm">
                <p className="text-text-md">
                  {HOME_CONSTANT[lang]['home-log-week-txt']}
                </p>
                {groupedData.week.map((item) => (
                  <Link
                    className="line-clamp-2"
                    href={`/home/last/${item.roomId}`}
                    key={crypto.randomUUID()}
                  >
                    {item.content}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* // info */}
          <div className="flex flex-col">
            <div className="rounded-xl bg-grey-70 py-2 text-center">
              <span className="text-2xs">
                {HOME_CONSTANT[lang]['home-log-info-txt']}
              </span>
            </div>
          </div>
        </>
      )}

      {isPending && (
        <div className="flex h-full items-center justify-center">
          <LoaderIcon />
        </div>
      )}

      {isError && (
        <div className="rounded-xl py-2">
          <span className="text-2xs">
            {HOME_CONSTANT[lang]['home-log-fetch-error-txt']}
          </span>
        </div>
      )}
    </div>
  )
}

export default HorongChatLogPage
