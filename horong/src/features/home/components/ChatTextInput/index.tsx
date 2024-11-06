import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import { ChatType } from '@/features/home/types/chatType.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import SendSVG from '@/static/svg/home/home-send-icon.svg'

interface ChatTextInputProps {
  setChatList: React.Dispatch<React.SetStateAction<ChatType[]>>
}

export default function ChatTextInput({ setChatList }: ChatTextInputProps) {
  const lang = useLangStore((state) => state.lang)
  const [inputValue, setInputValue] = useState<string>('')
  const [isPending, setIspending] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChatSubmit = async () => {
    if (inputValue.trim().length === 0) {
      return
    }

    setIspending(true)

    const userChat: ChatType = {
      type: 'user',
      text: inputValue,
      uuid: crypto.randomUUID(),
    }
    setChatList((prevChats) => [...prevChats, userChat])

    const tempHorongChat: ChatType = {
      type: 'horong',
      text: 'Loading...',
      uuid: crypto.randomUUID(),
    }
    setChatList((prevChats) => [...prevChats, tempHorongChat])

    try {
      const payload = {
        text: inputValue,
        lang: 'EN',
      }
      const resText = await axios.post('/api/translation', payload)
      // todo: 임시로 시스템 챗도 넣어놓음, 추후 api연동 후 수정

      const params = {
        question: 'resText',
      }
      const resDataText = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_URL}/chat`,
        { params },
      )
      console.log(resDataText)
      setChatList((prevChats) =>
        prevChats.map((chat) =>
          chat === tempHorongChat // 기존 로딩 중이던 horong 채팅을 업데이트
            ? { ...chat, text: resText.data.result.text, isLoading: false }
            : chat,
        ),
      )

      if (textareaRef.current) {
        textareaRef.current.style.height = '1rem'
      }
    } catch {
      setChatList((prevChats) =>
        prevChats.map((chat) =>
          chat === tempHorongChat // 기존 로딩 중이던 horong 채팅을 업데이트
            ? {
                ...chat,
                text: '답변 생성 중에 오류가 발생했어요.\n 잠시후 다시 시도해주세요.',
                isLoading: false,
              }
            : chat,
        ),
      )

      if (textareaRef.current) {
        textareaRef.current.style.height = '1rem'
      }
    } finally {
      setInputValue('')
      setIspending(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setInputValue(value)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const currentHeight = textareaRef.current.scrollHeight
      const currentLines = Math.floor(currentHeight / 16)

      if (currentLines > 5) {
        textareaRef.current.style.height = `${16 * 5}px` // 최대 3줄 높이
      } else {
        textareaRef.current.style.height = `${currentHeight}px`
      }
    }
  }

  return (
    <div className="flex gap-x-2.5 p-2.5">
      <div className="grow rounded-[.625rem] bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
        <div className="flex h-full items-center rounded-[.625rem] bg-[#1B1D24] px-3 py-1 text-xs">
          <textarea
            id="horong-chat-textarea"
            ref={textareaRef}
            onChange={(event) => handleInputChange(event)}
            className="w-full resize-none bg-[#1B1D24] text-white focus:outline-none"
            placeholder={HOME_CONSTANT[lang]['home-chat-placeholder']}
            value={inputValue}
            rows={1}
          />
        </div>
      </div>
      {/* 보내기 버튼 */}
      <button
        type="button"
        onClick={() => handleChatSubmit()}
        disabled={isPending}
      >
        <SendSVG />
      </button>
    </div>
  )
}
