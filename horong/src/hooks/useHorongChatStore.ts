import axios from 'axios'
import React from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { create } from 'zustand'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import { ChatType } from '@/features/home/types/chatType.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface HorongChatStore {
  chatList: ChatType[]
  isPending: boolean
  initializeChat: () => void
  handleChatSubmit: (
    inputValue: string,
    textareaRef: React.RefObject<HTMLTextAreaElement>,
  ) => Promise<void>
}

const useHorongChatStore = create<HorongChatStore>()((set) => ({
  chatList: [],
  isPending: false,

  initializeChat: () => {
    const lang = useLangStore.getState().lang
    set({
      chatList: [
        {
          type: 'horong',
          text: HOME_CONSTANT[lang]['home-txt2'],
          uuid: crypto.randomUUID(),
        },
      ],
    })
  },

  handleChatSubmit: async (inputValue, textareaRef) => {
    if (inputValue.trim().length === 0) {
      return
    }

    set({ isPending: true })

    const userChat: ChatType = {
      type: 'user',
      text: inputValue,
      uuid: crypto.randomUUID(),
    }
    set((state) => ({ chatList: [...state.chatList, userChat] }))

    const tempHorongChat: ChatType = {
      type: 'horong',
      text: React.createElement(LoaderIcon),
      uuid: crypto.randomUUID(),
    }
    set((state) => ({ chatList: [...state.chatList, tempHorongChat] }))

    const lang = useLangStore.getState().lang

    try {
      const params = {
        question: inputValue,
      }

      const resDataText = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_URL}/chat`,
        { params },
      )

      set((state) => ({
        chatList: state.chatList.map((chat) =>
          chat === tempHorongChat
            ? { ...chat, text: resDataText.data, isLoading: false }
            : chat,
        ),
      }))

      if (textareaRef.current) {
        textareaRef.current.style.height = '1rem'
      }
    } catch {
      set((state) => ({
        chatList: state.chatList.map((chat) =>
          chat === tempHorongChat
            ? {
                ...chat,
                text: HOME_CONSTANT[lang]['home-horong-error-txt'],
                isLoading: false,
              }
            : chat,
        ),
      }))

      if (textareaRef.current) {
        textareaRef.current.style.height = '1rem'
      }
    } finally {
      set({ isPending: false })
    }
  },
}))

export default useHorongChatStore
