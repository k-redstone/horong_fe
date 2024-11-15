'use client'
import { ChangeEvent, useRef, useState } from 'react'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import useHorongChatStore from '@/hooks/useHorongChatStore.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import SendSVG from '@/static/svg/home/home-send-icon.svg'

export default function ChatTextInput() {
  const lang = useLangStore((state) => state.lang)
  const [inputValue, setInputValue] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { handleChatSubmit, isPending } = useHorongChatStore()

  const onChatSubmit = () => {
    setInputValue('')
    handleChatSubmit(inputValue, textareaRef)
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
        <div className="flex h-full items-center rounded-[.625rem] bg-[#1B1D24] px-4 py-2 text-xs">
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
        onClick={() => onChatSubmit()}
        disabled={isPending}
      >
        <SendSVG />
      </button>
    </div>
  )
}
