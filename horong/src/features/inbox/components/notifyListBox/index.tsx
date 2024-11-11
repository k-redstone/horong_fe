'use client'

import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// import publicAPI from '@/api/publicAPI/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
// import { fetchNotifyStream } from '@/features/inbox/apis/message/index.ts'
import NotifyCard from '@/features/inbox/components/notifyCard/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

declare global {
  interface EventSourceEventMap {
    notification: MessageEvent
    testNotification: MessageEvent
  }
}

function NotifyListBox() {
  const [messages, setMessages] = useState([{}, {}])

  const lang = useLangStore((state) => state.lang)

  // const sendTestNotification = () => {
  //   console.log('Sending test notification...')
  //   publicAPI
  //     .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/test`, {})
  //     .then((response) => {
  //       console.log('Test notification sent successfully:', response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Failed to send test notification:', error)
  //     })
  // }

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem('token')
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 10000,
      },
    )

    // 기본 메시지 이벤트 수신기 설정
    eventSource.onmessage = function (event) {
      setMessages((prevMessages) => [...prevMessages, event.data])
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

    // 'notification' 커스텀 이벤트 수신기
    eventSource.addEventListener('notification', (event) => {
      const newMessage = (event as MessageEvent).data
      console.log('Received notification message:', newMessage)
    })

    // 'testNotification' 커스텀 이벤트 수신기
    eventSource.addEventListener('testNotification', (event) => {
      const newMessage = (event as MessageEvent).data
      console.log('Received testNotification message:', newMessage)
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
          // todo: url 주소 바꾸기
          href={`/inbox/`}
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
