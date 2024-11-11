'use client'
import { useQuery } from '@tanstack/react-query'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useEffect, useState } from 'react'

import publicAPI from '@/api/publicAPI'
import { fetchNotifyStream } from '@/features/inbox/apis/message/index.ts'

function NotifyListBox() {
  const [messages, setMessages] = useState([])
  // const { data, isSuccess } = useQuery({
  //   queryKey: ['message', { type: 'stream' }],
  //   queryFn: fetchNotifyStream,
  // })

  const sendTestNotification = () => {
    console.log('Sending test notification...')
    publicAPI
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/test`, {})
      .then((response) => {
        console.log('Test notification sent successfully:', response.data)
      })
      .catch((error) => {
        console.error('Failed to send test notification:', error)
      })
  }

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem('token')
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/stream`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   heartbeatTimeout: 10000,
      // },
    )
    console.log(eventSource.readyState)

    eventSource.onmessage = function (event) {
      setMessages((prevMessages) => [...prevMessages, event.data])
    }

    eventSource.onopen = () => {
      console.log('EventSource connection opened')
    }

    eventSource.onerror = function (error) {
      console.error('EventSource failed:', error)
      eventSource.close() // 에러 발생 시 연결 종료
    }

    eventSource.addEventListener('connect', (event) => {
      const { data: receivedConnectData } = event
      if (receivedConnectData === 'SSE 연결이 완료되었습니다.') {
        console.log('SSE CONNECTED')
      } else {
        console.log(event)
      }
    })

    eventSource.addEventListener('notification', (event) => {
      console.log('Received message:', event.data)
    })

    eventSource.addEventListener('testNotification', (event) => {
      const newMessage = event.data
      console.log('Received testNotification message:', newMessage)
    })

    eventSource.addEventListener('keepAlive', (event) => {
      console.log('KeepAlive event received:', event.data)
    })

    return () => {
      eventSource.close() // 컴포넌트가 언마운트될 때 연결 종료
    }
  }, [])

  return (
    <div>
      <p>asdflkjasldkfjkals</p>
      <button onClick={sendTestNotification}>test</button>
      <p>{messages}</p>
    </div>
  )
}

export default NotifyListBox
