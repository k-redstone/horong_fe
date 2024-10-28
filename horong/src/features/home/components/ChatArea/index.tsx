'use client'
import { useState } from 'react'

import ChatDefault from '@/features/home/components/ChatDefault/index.tsx'
import ChatListBox from '@/features/home/components/ChatListBox/index.tsx'
import ChatTextInput from '@/features/home/components/ChatTextInput/index.tsx'
import { ChatType } from '@/features/home/types/chatType.ts'

export default function ChatArea() {
  const [chatList, setChatList] = useState<ChatType[]>([
    {
      type: 'horong',
      text: '안녕하세요, 호롱입니다 :D \r\n궁금하신게 있으시면 편하게 말씀해주세요 ❤',
    },
  ])

  return (
    <div className="flex h-full flex-col">
      {chatList.length == 1 ? (
        <div className="flex grow flex-col justify-center">
          <ChatDefault />
        </div>
      ) : (
        <ChatListBox data={chatList} />
      )}
      <ChatTextInput setChatList={setChatList} />
    </div>
  )
}
