'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import {
  fetchOriginalComment,
  updateComment,
} from '@/features/community/apis/post/index.ts'
import {
  CommentContentPaylaod,
  CommentPromise,
  CommentUpdatePayload,
  PostPromise,
} from '@/features/community/types/post/index.ts'
import {
  transLanguageType,
  transText,
} from '@/features/community/utils/editor/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface CommentUpdatePageProps {
  data: CommentPromise
  postId: number
  handleUpdateClose: () => void
}

function CommentUpdatePage(props: CommentUpdatePageProps) {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const lang = useLangStore((state) => state.lang)
  const { contents, id: commentId } = props.data
  const [inputValue, setInputValue] = useState<string>(contents)
  const [isPending, setIsPending] = useState<boolean>(false)

  const postTitle =
    (queryClient.getQueryData(['postDetail', props.postId]) as PostPromise) ||
    ''

  const { data: originalCommentData, isSuccess } = useQuery({
    queryKey: ['originComment'],
    queryFn: () => fetchOriginalComment(commentId),
    staleTime: 0,
  })

  const { mutateAsync: commentMutation } = useMutation({
    mutationFn: (payload: CommentUpdatePayload) =>
      updateComment(props.postId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', props.postId] })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: params.boardType }],
      })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: 'preview' }],
      })
      setInputValue('')

      setIsPending(false)
      router.push(`/community/${params.boardType}/${props.postId}`)
    },
    onError: () => {
      setIsPending(false)
    },
  })

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length >= 100) {
      return
    }
    setInputValue(newValue)
  }

  const handleSubmit = async () => {
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
          commentId: commentId,
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

  useEffect(() => {
    if (originalCommentData) {
      setInputValue(originalCommentData.contents || '')
    }
  }, [originalCommentData])

  return (
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-full flex-col bg-black">
      {/* 헤더 */}
      <div className="flex w-full items-center justify-between px-5 py-4">
        <button
          className="px-1 py-0.5"
          onClick={props.handleUpdateClose}
        >
          <span className="text-sm">
            {COMMUNITY_CONSTANT[lang]['cancel-text']}
          </span>
        </button>

        <p className="font-bold">
          <span> {COMMUNITY_CONSTANT[lang]['comment-edit-header']}</span>
        </p>

        <button
          className="px-2 py-[.1875rem]"
          onClick={() => handleSubmit()}
          disabled={isPending}
        >
          <span className="text-sm text-primary">
            {COMMUNITY_CONSTANT[lang]['modal-edit-text']}
          </span>
        </button>
      </div>
      {isSuccess && (
        <div className="grow bg-grey-80">
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {/* 본문 게시글 */}
            <div className="flex flex-col gap-y-2 text-sm font-bold">
              <span>{COMMUNITY_CONSTANT[lang]['post-text']}</span>
              <p className="hyphens-auto break-all">{postTitle.title}</p>
            </div>
            {/* 댓글 인풋 */}
            <div className="flex py-3">
              <textarea
                className="h-10 grow resize-none bg-grey-80 text-xs focus:outline-none"
                value={inputValue}
                onChange={(e) => handleValueChange(e)}
              ></textarea>
            </div>
            {/* 글자 수 */}
            <div className="flex justify-end">
              <span className="text-xs">{inputValue.length}/100</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentUpdatePage
