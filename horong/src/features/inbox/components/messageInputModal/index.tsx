'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface MessageInputModalProps {
  handleModalClose: () => void
  handleSendChat: (arg: string) => void
  userId: number
  postId: number
  isPending: boolean
}

function MessageInputModal(props: MessageInputModalProps) {
  const router = useRouter()
  const { handleModalClose, handleSendChat, isPending } = props
  const lang = useLangStore((state) => state.lang)
  const [inputValue, setInputValue] = useState<string>('')

  const {
    data: isChatroomExist,
    isSuccess,
    isPending: checkingChatroom,
  } = useQuery({
    queryKey: [
      'isChatroomExist',
      {
        postId: props.postId,
        userId: props.userId,
      },
    ],
    queryFn: async () => {
      const res = await privateAPI.get(`/community/chatroom/check`, {
        params: {
          userId: props.userId,
          postId: props.postId,
        },
      })

      return res.data.result
    },
  })

  useEffect(() => {
    if (isSuccess && isChatroomExist !== -1) {
      router.push(`/inbox/${isChatroomExist}`)
    }
  }, [isSuccess, isChatroomExist, router])

  if (checkingChatroom) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        onClick={() => handleModalClose()}
      >
        <div
          className="flex w-[16.25rem] justify-center gap-y-2 rounded-lg bg-grey-80 px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <LoaderIcon />
        </div>
      </div>
    )
  }

  if (isSuccess && isChatroomExist === -1) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        onClick={() => handleModalClose()}
      >
        <div
          className="flex w-[16.25rem] flex-col gap-y-2 rounded-lg bg-grey-80 px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            className="h-20 resize-none border border-white bg-grey-80 p-2 text-xs focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <button
            type="button"
            onClick={() => handleSendChat(inputValue)}
            disabled={isPending}
          >
            {INBOX_CONSTANT[lang]['message-send-txt']}
          </button>
        </div>
      </div>
    )
  }
}

export default MessageInputModal
