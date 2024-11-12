'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

import { fetchChatLog } from '@/features/home/api/chatlog.ts'
import HorongChatBox from '@/features/home/components/HorongChatBox/index.tsx'
import UserChatBox from '@/features/home/components/UserChatBox/index.tsx'
import { FetchChatType } from '@/features/home/types/chatlogType.ts'
interface HorongChatLogDetailProps {
  params: {
    logId: string
  }
}

function HorongChatLogDetail({ params }: HorongChatLogDetailProps) {
  const router = useRouter()
  const scrollDiv = useRef<HTMLDivElement>(null)

  const { data, isSuccess } = useQuery({
    queryKey: ['chatlog', parseInt(params.logId)],
    queryFn: () => fetchChatLog(parseInt(params.logId)),
  })

  const groupedData = useMemo<Record<string, FetchChatType[]>>(() => {
    if (!data) return {}
    return data.chatContentList.reduce(
      (acc, item) => {
        const dateKey = new Date(item.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replaceAll('. ', '.')

        if (!acc[dateKey]) acc[dateKey] = []
        acc[dateKey].push(item)
        return acc
      },
      {} as Record<string, FetchChatType[]>,
    )
  }, [data])

  useEffect(() => {
    if (isSuccess && !data) {
      router.replace('/home/log')
    }
    scrollDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [data, isSuccess, router])

  return (
    <div className="flex h-full flex-col gap-y-4 overflow-y-scroll px-3 py-4">
      {Object.keys(groupedData).map((date) => (
        <div
          className="flex flex-col gap-y-4"
          key={crypto.randomUUID()}
        >
          <div
            className="flex w-full justify-center"
            key={crypto.randomUUID()}
          >
            {/* 날짜 헤더 */}

            <div className="rounded-xl bg-grey-70 px-3 py-2 text-2xs">
              {date}
            </div>
          </div>
          {groupedData[date].map((item) => {
            return item.authorType === 'BOT' ? (
              <HorongChatBox
                key={crypto.randomUUID()}
                text={item.content}
              />
            ) : item.authorType === 'USER' ? (
              <UserChatBox
                key={crypto.randomUUID()}
                text={item.content}
              />
            ) : null
          })}
        </div>
      ))}
      <div ref={scrollDiv} />
    </div>
  )
}

export default HorongChatLogDetail
