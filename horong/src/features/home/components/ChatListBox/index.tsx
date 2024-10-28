import { useEffect, useRef } from 'react'

import HorongChatBox from '@/features/home/components/HorongChatBox/index.tsx'
import UserChatBox from '@/features/home/components/UserChatBox/index.tsx'
import { ChatType } from '@/features/home/types/chatType.ts'

interface ChatListBoxProps {
  data: ChatType[]
}

export default function ChatListBox({ data }: ChatListBoxProps) {
  const chatListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [data])

  return (
    <div
      id="horong-chat-ListBox"
      ref={chatListRef}
      className="flex h-[calc(100dvh-3.4994rem-3.25rem)] flex-col gap-y-4 overflow-y-scroll px-3 py-8"
    >
      {data.map((item) => {
        if (item.type === 'horong') {
          return (
            <div key={item.text}>
              <HorongChatBox text={item.text} />
            </div>
          )
        } else {
          return (
            <div key={item.text}>
              <UserChatBox text={item.text} />
            </div>
          )
        }
      })}
    </div>
  )
}
