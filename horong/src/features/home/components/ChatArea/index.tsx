'use client'
import { useState } from 'react'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import ChatDefault from '@/features/home/components/ChatDefault/index.tsx'
import ChatListBox from '@/features/home/components/ChatListBox/index.tsx'
import ChatTextInput from '@/features/home/components/ChatTextInput/index.tsx'
import { ChatType } from '@/features/home/types/chatType.ts'
import useLangStore from '@/hooks/useLangStore.ts'

export default function ChatArea() {
  const lang = useLangStore((state) => state.lang)
  const [chatList, setChatList] = useState<ChatType[]>([
    {
      type: 'horong',
      text: HOME_CONSTANT[lang]['home-txt2'],
    },
  ])

  return (
    <div className="relative flex h-full flex-col">
      {chatList.length == 1 ? (
        <div className="flex grow flex-col justify-center">
          <ChatDefault />
        </div>
      ) : (
        <ChatListBox data={chatList} />
      )}
      <div className="absolute bottom-0 w-full">
        <ChatTextInput setChatList={setChatList} />
      </div>
    </div>
  )
}
