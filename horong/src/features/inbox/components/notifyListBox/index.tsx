'use client'
import { useQuery } from '@tanstack/react-query'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useEffect, useState } from 'react'

import { fetchNotifyStream } from '@/features/inbox/apis/message/index.ts'

function NotifyListBox() {
  const [messages, setMessages] = useState([])
  // const { data, isSuccess } = useQuery({
  //   queryKey: ['message', { type: 'stream' }],
  //   queryFn: fetchNotifyStream,
  // })

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
    console.log(eventSource.readyState)

    // eventSource.onmessage = function (event) {
    //   setMessages((prevMessages) => [...prevMessages, event.data])
    // }

    eventSource.addEventListener('connect', (event) => {
      const { data: receivedConnectData } = event
      if (receivedConnectData === 'SSE 연결이 완료되었습니다.') {
        console.log('SSE CONNECTED')
      } else {
        console.log(event)
      }
    })
    addEventListener('error', (event) => {
      console.log(event)
    })
    eventSource.addEventListener('message', (event) => {
      console.log('Received message:', event.data)
    })

    eventSource.onerror = function (error) {
      console.error('EventSource failed:', error)
      eventSource.close() // 에러 발생 시 연결 종료
    }

    return () => {
      eventSource.close() // 컴포넌트가 언마운트될 때 연결 종료
    }
  }, [])

  return (
    <div>
      <p>asdflkjasldkfjkals</p>
      <p>{messages}</p>
    </div>
  )
}

export default NotifyListBox
