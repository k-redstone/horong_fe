'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { createComment } from '@/features/community/apis/post/index.ts'
import { CommentContentPaylaod } from '@/features/community/types/post/index.ts'
import {
  transLanguageType,
  transText,
} from '@/features/community/utils/editor/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import useUserId from '@/hooks/useUserId.ts'
import CommentSendSVG from '@/static/svg/community/community-comment-send-icon.svg'
import { sendFCMPush } from '@/util/sendFCMPush.ts'
interface CommentInputProps {
  postId: number
  boardType: string
  boardUserId: number
}

function CommentInput(props: CommentInputProps) {
  const { postId, boardType, boardUserId } = props
  const { loginUserId } = useUserId()
  const queryClient = useQueryClient()
  const lang = useLangStore((state) => state.lang)
  const [inputValue, setInputValue] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const { mutateAsync: commentMutation } = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: boardType }],
      })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: 'preview' }],
      })
      if (loginUserId !== boardUserId) {
        sendFCMPush(boardUserId, 'COMMENT', postId, boardType)
      }
      setInputValue('')
      setIsPending(false)
    },
    onError: () => {
      setIsPending(false)
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleComment = async () => {
    if (inputValue.trim().length === 0) {
      return toast.error(`${COMMUNITY_CONSTANT[lang]['post-submit-is-blank']}`)
    }
    setIsPending(true)
    toast.promise(
      (async () => {
        const translatedComment = await transText(inputValue)
        const contentByCountries: CommentContentPaylaod[] =
          translatedComment.map((item) => ({
            content: item.text,
            isOriginal: false,
            language: transLanguageType(item.lang),
          }))

        contentByCountries.push({
          content: inputValue,
          isOriginal: true,
        })

        const payload = {
          postId: postId,
          content: inputValue,
          contentByCountries: contentByCountries,
        }
        await commentMutation(payload)
      })(),
      {
        loading: COMMUNITY_CONSTANT[lang]['comment-submit-toast-loading'],
        success: COMMUNITY_CONSTANT[lang]['comment-submit-toast-success'],
        error: COMMUNITY_CONSTANT[lang]['comment-submit-toast-fail'],
      },
    )
  }

  return (
    <div className="flex gap-x-3 py-2">
      <input
        className="box-border grow rounded-lg border border-text-disabled bg-grey-80 px-3 text-xs text-text-high focus:outline-none"
        type="text"
        value={inputValue}
        onChange={(e) => handleChangeInput(e)}
        placeholder={COMMUNITY_CONSTANT[lang]['comment-input-placeholder']}
      />
      <button
        className="shrink-0"
        onClick={() => handleComment()}
        disabled={isPending}
      >
        <CommentSendSVG />
      </button>
    </div>
  )
}

export default CommentInput
