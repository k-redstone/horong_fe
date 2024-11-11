'use client'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import privateAPI from '@/api/privateAPI/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import NotifyCard from '@/features/inbox/components/notifyCard/index.tsx'
import { NotifyPromise } from '@/features/inbox/types/message/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

declare global {
  interface EventSourceEventMap {
    notification: MessageEvent
    testNotification: MessageEvent
  }
}

function NotifyListBox() {
  const [messages, setMessages] = useState<NotifyPromise[]>([])

  const lang = useLangStore((state) => state.lang)

  const handleReadNotify = async (
    notificationId: number,
    type: 'COMMENT' | 'MESSAGE',
  ) => {
    const params = {
      notificationId: notificationId,
      type: type,
    }
    await privateAPI.post(`/notifications/${notificationId}`, null, { params })

    setMessages((prevData) => {
      return prevData.filter((item) => item.id !== notificationId)
    })
  }

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem('token')
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 20000,
      },
    )

    // 기본 메시지 이벤트 수신기 설정
    eventSource.onmessage = function () {
      // setMessages((prevMessages) => [...prevMessages, event.data])
    }

    // 연결이 열렸을 때
    eventSource.onopen = () => {
      console.log('EventSource connection opened')
    }

    // 에러 발생 시
    eventSource.onerror = function (error) {
      console.error('EventSource failed:', error)
      eventSource.close() // 에러 발생 시 연결 종료
    }

    eventSource.addEventListener('connect', () => {
      console.log('first connect')
    })

    // 'notification' 커스텀 이벤트 수신기
    eventSource.addEventListener('notification', (event) => {
      console.log('Received notification message:')
      const newMessage = (event as MessageEvent).data
      const parsedData = JSON.parse(newMessage)

      // `id`를 기준으로 데이터 저장
      setMessages((prevData) => {
        const exists = prevData.find((item) => item.id === parsedData.id)
        if (!exists) {
          return [...prevData, parsedData]
        }
        return prevData
      })
      console.log(parsedData)
    })

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="flex max-h-[calc(100dvh-13.25rem)] flex-col items-center gap-y-3 overflow-y-scroll px-6 pb-8">
      {messages.map((item) => (
        <Link
          key={crypto.randomUUID()}
          // todo: 게시글 타입 반영
          href={
            item.type === 'COMMENT'
              ? `/community/free/${item.postId}`
              : `/inbox/${item.chatRoomId}`
          }
          onClick={() => handleReadNotify(item.id, item.type)}
        >
          <NotifyCard data={item} />
        </Link>
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
