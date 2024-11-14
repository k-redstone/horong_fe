'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import privateAPI from '@/api/privateAPI/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import NotifyCard from '@/features/inbox/components/notifyCard/index.tsx'
import { NotifyPromise } from '@/features/inbox/types/message/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import useNotificationStore from '@/hooks/useNotificationStore.ts'

function NotifyListBox() {
  const lang = useLangStore((state) => state.lang)
  const { messages, removeMessage } = useNotificationStore()

  const handleReadNotify = async (
    notificationId: number,
    type: 'COMMENT' | 'MESSAGE',
  ) => {
    const params = {
      notificationId: notificationId,
      type: type,
    }
    await privateAPI.post(`/notifications/${notificationId}`, null, { params })

    removeMessage(notificationId)
  }

  const groupedData = useMemo<Record<string, NotifyPromise[]>>(() => {
    if (!messages) return {}
    return messages.reduce(
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
      {} as Record<string, NotifyPromise[]>,
    )
  }, [messages])

  return (
    <div className="flex max-h-[calc(100dvh-13.25rem)] flex-col items-center gap-y-3 overflow-y-scroll px-3 pb-8">
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
          {messages.map((item) => (
            <Link
              key={crypto.randomUUID()}
              // todo: 게시글 타입 반영
              href={
                item.type === 'COMMENT'
                  ? `/community/${item.postContent?.type.toLowerCase()}/${item.postContent?.postId}`
                  : `/inbox/${item.messageContent?.roomId}`
              }
              onClick={() => handleReadNotify(item.id, item.type)}
            >
              <NotifyCard data={item} />
            </Link>
          ))}
        </div>
      ))}

      {messages.length === 0 && (
        <div>
          <p>{INBOX_CONSTANT[lang]['notify-no-item-txt']}</p>
        </div>
      )}
    </div>
  )
}

export default NotifyListBox
