'use client'

// import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useEffect } from 'react'

// import privateAPI from '@/api/privateAPI/index.ts'
// import { NotifyPromise } from '@/features/inbox/types/message/index.ts'
import useNotificationStore from '@/hooks/useNotificationStore.ts'

declare global {
  interface EventSourceEventMap {
    notification: MessageEvent
    testNotification: MessageEvent
  }
}

function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { initializeEventSource, closeEventSource } = useNotificationStore()

  useEffect(() => {
    initializeEventSource()

    return () => {
      closeEventSource()
    }
  }, [closeEventSource, initializeEventSource])

  return <>{children}</>
}

export default CommunityLayout
