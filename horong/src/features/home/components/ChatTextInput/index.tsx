import { useState } from 'react'

import { ChatType } from '@/features/home/types/chatType.ts'
import SendSVG from '@/static/svg/home/home-send-icon.svg'

interface ChatTextInputProps {
  setChatList: React.Dispatch<React.SetStateAction<ChatType[]>>
}

export default function ChatTextInput({ setChatList }: ChatTextInputProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const handleChatSubmit = () => {
    const userChat: ChatType = {
      type: 'user',
      text: inputValue,
    }
    setChatList((prevChats) => [...prevChats, userChat])

    // todo: 임시로 시스템 챗도 넣어놓음, 추후 api연동 후 수정
    const horongChat: ChatType = {
      type: 'horong',
      text: 'horongChat 테스트',
    }
    setChatList((prevChats) => [...prevChats, horongChat])
    setInputValue('')
  }

  return (
    <div className="flex gap-x-2.5 p-2.5">
      <div className="grow rounded-[.625rem] bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
        <div className="flex h-full items-center rounded-[.625rem] bg-[#1B1D24] px-3 py-1 text-xs">
          <textarea
            id="horong-chat-textarea"
            className="h-ful w-full resize-none bg-[#1B1D24] text-white focus:outline-none"
            placeholder="메세지를 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={1}
          />
        </div>
      </div>
      {/* 보내기 버튼 */}
      <button
        type="button"
        onClick={() => handleChatSubmit()}
      >
        <SendSVG />
      </button>
    </div>
  )
}
