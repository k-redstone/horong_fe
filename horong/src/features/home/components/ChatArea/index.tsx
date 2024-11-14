'use client'
// import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import ChatDefault from '@/features/home/components/ChatDefault/index.tsx'
import ChatListBox from '@/features/home/components/ChatListBox/index.tsx'
import ChatTextInput from '@/features/home/components/ChatTextInput/index.tsx'
import useHorongChatStore from '@/hooks/useHorongChatStore.ts'
import useLangStore from '@/hooks/useLangStore.ts'
export default function ChatArea() {
  const lang = useLangStore((state) => state.lang)
  const { initializeChat } = useHorongChatStore()

  const { chatList } = useHorongChatStore()

  useEffect(() => {
    initializeChat()
  }, [initializeChat, lang])

  return (
    <div className="relative flex h-full flex-col">
      {chatList.length < 2 ? (
        <div className="flex grow flex-col justify-center">
          <ChatDefault />
        </div>
      ) : (
        <ChatListBox data={chatList} />
      )}
      <div className="absolute bottom-0 w-full">
        <ChatTextInput />
      </div>
    </div>
  )
}
