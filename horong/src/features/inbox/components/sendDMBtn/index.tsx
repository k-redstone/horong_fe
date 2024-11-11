'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import useModal from '@/features/community/hooks/useModal/index.tsx'
import { CommentContentPaylaod } from '@/features/community/types/post/index.ts'
import {
  transLanguageType,
  transText,
} from '@/features/community/utils/editor/index.ts'
import { sendFirstMessage } from '@/features/inbox/apis/message/index.ts'
import MessageInputModal from '@/features/inbox/components/messageInputModal/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

interface SendDMBtnProps {
  userId: number
  postId: number
}

function SendDMBtn({ userId, postId }: SendDMBtnProps) {
  const queryClient = useQueryClient()
  const lang = useLangStore((state) => state.lang)
  const [isPending, setIsPending] = useState<boolean>(false)
  const { isModalOpen, portalElement, handleModalClose, handleModalOpen } =
    useModal()

  const { mutateAsync: messageMutation } = useMutation({
    mutationFn: sendFirstMessage,

    onSuccess: () => {
      handleModalClose()
      queryClient.invalidateQueries({
        queryKey: [
          'isChatroomExist',
          {
            postId: postId,
            userId: userId,
          },
        ],
      })
      setIsPending(false)
    },
    onError: () => {
      setIsPending(false)
    },
  })

  const handleSendChat = (inputValue: string) => {
    if (inputValue.trim().length === 0) {
      return toast.error(`${COMMUNITY_CONSTANT[lang]['post-submit-is-blank']}`)
    }

    setIsPending(true)

    toast.promise(
      (async () => {
        const translatedComment = await transText(inputValue)
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

        await messageMutation({ userId, postId, contentsByLanguages })
      })(),
      {
        loading: INBOX_CONSTANT[lang]['message-submit-toast-loading'],
        success: INBOX_CONSTANT[lang]['message-submit-toast-success'],
        error: INBOX_CONSTANT[lang]['message-submit-toast-fail'],
      },
    )
  }

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <MessageInputModal
              handleModalClose={handleModalClose}
              handleSendChat={handleSendChat}
              isPending={isPending}
              postId={postId}
              userId={userId}
            />,
            portalElement,
          )
        : null}
      <button
        className="rounded-2xl border border-text-disabled px-2 py-1 text-2xs text-text-disabled"
        onClick={handleModalOpen}
      >
        {COMMUNITY_CONSTANT[lang]['submit-dm-text']}
      </button>
    </>
  )
}

export default SendDMBtn
