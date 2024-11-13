import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { create } from 'zustand'

import { NotifyPromise } from '@/features/inbox/types/message/index.ts'

interface NotificationStore {
  messages: NotifyPromise[]
  eventSource: EventSource | null
  initializeEventSource: () => void
  closeEventSource: () => void
  addMessage: (message: NotifyPromise) => void
  removeMessage: (notificationId: number) => void
}

const useNotificationStore = create<NotificationStore>()((set, get) => ({
  messages: [],
  eventSource: null,

  initializeEventSource: () => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = sessionStorage.getItem('token')
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 70 * 1000,
      },
    )

    eventSource.onmessage = function () {
      // Optional: Handle default message events
    }

    eventSource.onopen = () => {
      console.log('EventSource connection opened')
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
      set({ eventSource: null })
    }

    eventSource.addEventListener('notification', (event) => {
      const newMessage = (event as MessageEvent).data
      const parsedData = JSON.parse(newMessage)
      const exists = get().messages.find((item) => item.id === parsedData.id)

      if (!exists) {
        set((state) => ({
          messages: [...state.messages, parsedData],
        }))
      }
      console.log(parsedData)
    })

    set({ eventSource })
  },

  closeEventSource: () => {
    const { eventSource } = get()
    eventSource?.close()
    set({ eventSource: null })
  },

  addMessage: (message: NotifyPromise) => {
    set((state) => ({
      messages: [...state.messages, message],
    }))
  },

  removeMessage: (notificationId: number) => {
    set((state) => ({
      messages: state.messages.filter((item) => item.id !== notificationId),
    }))
  },
}))

export default useNotificationStore
