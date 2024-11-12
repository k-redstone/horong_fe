'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'

import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import { uploadS3AnddInsertEmbed } from '@/features/community/apis/editor/index.ts'
import {
  CommentContentPaylaod,
  MessageSendPayload,
} from '@/features/community/types/post/index.ts'
import {
  transLanguageType,
  transText,
} from '@/features/community/utils/editor/index.ts'
import {
  fetchMessage,
  sendMessage,
} from '@/features/inbox/apis/message/index.ts'
import SenderChatBox from '@/features/inbox/components/senderChatBox/index.tsx'
import UserChatBox from '@/features/inbox/components/userChatBox/index.tsx'
import { MessagePromise } from '@/features/inbox/types/message/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ImgIcon from '@/static/svg/inbox/inbox-input-img-icon.svg'
import SendIcon from '@/static/svg/inbox/inbox-send-icon.svg'

interface InboxMessagePageProps {
  params: {
    chatroomId: string
  }
}

function InboxMessagePage({ params }: InboxMessagePageProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const lang = useLangStore((state) => state.lang)

  const [inputValue, setInputValue] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const {
    data: chatRoomData,
    isSuccess,
    isPending: isMessagePending,
    isError,
  } = useQuery({
    queryKey: ['message', { type: parseInt(params.chatroomId) }],
    queryFn: () => fetchMessage(parseInt(params.chatroomId)),
    staleTime: 1000 * 10,
  })

  const { mutateAsync: messageMutation } = useMutation({
    mutationFn: (payload: MessageSendPayload) => sendMessage(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['message', { type: parseInt(params.chatroomId) }],
      })

      setInputValue('')
      setIsPending(false)
    },
    onError: () => {
      setIsPending(false)
    },
  })

  const groupedData = useMemo<Record<string, MessagePromise[]>>(() => {
    if (!chatRoomData) return {}
    return chatRoomData.messageList.reduce(
      (acc, item) => {
        const dateKey = new Date(item.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replaceAll('. ', '.')

        if (!acc[dateKey]) acc[dateKey] = []
        acc[dateKey].push(item)
        return acc
      },
      {} as Record<string, MessagePromise[]>,
    )
  }, [chatRoomData])

  const handleSubmitMessage = () => {
    if (inputValue.trim().length === 0) {
      return toast.error(`${INBOX_CONSTANT[lang]['message-submit-is-blank']}`)
    }
    setIsPending(true)

    toast.promise(
      (async () => {
        const translatedComment = await transText(inputValue.trim())
        const contentsByLanguages: CommentContentPaylaod[] =
          translatedComment.map((item) => ({
            content: item.text,
            isOriginal: false,
            language: transLanguageType(item.lang),
          }))

        contentsByLanguages.push({
          content: inputValue,
          isOriginal: true,
        })
        const payload = {
          chatRoomId: parseInt(params.chatroomId),
          contentsByLanguages: contentsByLanguages,
          contentImageRequest: [],
        }
        await messageMutation(payload)
      })(),
      {
        loading: INBOX_CONSTANT[lang]['message-submit-toast-loading'],
        success: INBOX_CONSTANT[lang]['message-submit-toast-success'],
        error: INBOX_CONSTANT[lang]['message-submit-toast-fail'],
      },
    )
  }

  const handleSubmitImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsPending(true)

    toast.promise(
      (async () => {
        const imgURL = await uploadS3AnddInsertEmbed(file)
        const payload = {
          chatRoomId: parseInt(params.chatroomId),
          contentImageRequest: [
            {
              imageUrl: `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
            },
          ],
        }
        await messageMutation(payload)
      })(),
      {
        loading: INBOX_CONSTANT[lang]['message-submit-toast-loading'],
        success: INBOX_CONSTANT[lang]['message-submit-toast-success'],
        error: INBOX_CONSTANT[lang]['message-submit-toast-fail'],
      },
    )
  }

  const handleFileInputClick = () => {
    const fileInput = document.getElementById('messageImg') as HTMLInputElement
    if (fileInput) {
      fileInput.value = '' // 이전 선택된 파일을 리셋
    }
  }

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['message', { type: 'all' }] })
    }
    if (isSuccess && !chatRoomData) {
      router.push('/inbox')
    }
  }, [chatRoomData, isSuccess, queryClient, router])

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grow bg-grey-80">
        {isSuccess && chatRoomData !== null && (
          <div className="flex h-[calc(100dvh-12.625rem)] flex-col gap-y-4 overflow-y-scroll px-3 py-4">
            {Object.keys(groupedData).map((date) => (
              <div
                className="flex flex-col gap-y-4"
                key={crypto.randomUUID()}
              >
                <div
                  className="flex w-full justify-center"
                  key={crypto.randomUUID()}
                >
                  {/* 날짜 헤더 */}

                  <div className="rounded-xl bg-grey-70 px-3 py-2 text-2xs">
                    {date}
                  </div>
                </div>
                {groupedData[date].map((item) => {
                  return item.userMessageType === 'OPPONENT' ? (
                    <SenderChatBox
                      key={crypto.randomUUID()}
                      data={item}
                    />
                  ) : item.userMessageType === 'USER' ? (
                    <UserChatBox
                      key={crypto.randomUUID()}
                      data={item}
                    />
                  ) : null
                })}
              </div>
            ))}
          </div>
        )}
        {isMessagePending && (
          <div className="flex h-full items-center justify-center">
            <LoaderIcon />
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center">
            <p>{INBOX_CONSTANT[lang]['message-fetch-error']}</p>
          </div>
        )}
        {/* input */}
        {isSuccess && chatRoomData !== null && (
          <div className="flex gap-x-2 px-4 py-2.5">
            <div className="w-full grow rounded-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
              <input
                className="flex h-full w-full rounded-xl bg-[#1B1D24] px-2.5 py-1 text-xs focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
              />
            </div>
            <div>
              <input
                id="messageImg"
                type="file"
                accept="image/*"
                style={{ display: 'none' }} // 버튼 클릭 시만 파일 선택 창이 보이게 설정
                onChange={handleSubmitImg}
              />
              <label
                htmlFor="messageImg"
                className="cursor-pointer"
                onClick={handleFileInputClick}
              >
                <ImgIcon />
              </label>
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={handleSubmitMessage}
            >
              <SendIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InboxMessagePage
