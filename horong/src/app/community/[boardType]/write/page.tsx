'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { createPost } from '@/features/community/apis/post/index.ts'
import { PostCreatePayload } from '@/features/community/types/post/index.ts'
import {
  transContentToPostPayload,
  transHTML,
  transPathtoHeader,
  transPathtoPayloadBoardType,
  transText,
} from '@/features/community/utils/editor/index.ts'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

const PostEditor = dynamic(
  () => import('@/features/community/components/postEditor/index.tsx'),
  { ssr: false },
)

interface CommunityPostWritePageProps {
  params: { boardType: CommunityPathType }
}

function CommunityPostWritePage({ params }: CommunityPostWritePageProps) {
  const lang = useLangStore((state) => state.lang)
  const queryClient = useQueryClient()

  const router = useRouter()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imgList, setImgList] = useState<string[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)

  const { mutateAsync } = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: params.boardType }],
      })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: 'preview' }],
      })
      setIsPending(false)
      router.push(`/community/${params.boardType}`)
    },
    onError: () => {
      setIsPending(false)
    },
  })

  const handleSubmit = async () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      return toast.error(`${COMMUNITY_CONSTANT[lang]['post-submit-is-blank']}`)
    }
    setIsPending(true)
    toast.promise(
      (async () => {
        const translatedContent = await transHTML(content.trim())
        const translatedTitle = await transText(title.trim())
        console.log(
          transContentToPostPayload(translatedContent, translatedTitle),
        )
        console.log(imgList)
        const contentListPaylaod = transContentToPostPayload(
          translatedContent,
          translatedTitle,
        )
        contentListPaylaod.push({
          title: title.trim(),
          content: content.trim(),
          isOriginal: true,
        })
        const payload: PostCreatePayload = {
          content: contentListPaylaod,
          boardType: transPathtoPayloadBoardType(params.boardType),
          contentImageRequest: imgList.map((img) => {
            return {
              imageUrl: img,
            }
          }),
        }
        await mutateAsync(payload)
      })(),
      {
        loading: COMMUNITY_CONSTANT[lang]['post-submit-toast-loading'],
        success: COMMUNITY_CONSTANT[lang]['post-submit-toast-success'],
        error: COMMUNITY_CONSTANT[lang]['post-submit-toast-fail'],
      },
    )
  }

  if (params.boardType === 'notice') {
    notFound()
  }

  return (
    <div className="flex w-full flex-col">
      {/* 헤더 */}
      <div className="flex w-full items-center justify-between px-5 py-4">
        <button
          type="button"
          className="px-1 py-0.5"
          onClick={() => router.back()}
        >
          <span className="text-sm">
            {COMMUNITY_CONSTANT[lang]['cancel-text']}
          </span>
        </button>
        <p className="font-bold">
          <span>{transPathtoHeader(lang, params.boardType)}</span>
        </p>
        {/* todo: 사이드바 만들기 */}
        <button
          className="px-2 py-[.1875rem]"
          onClick={() => handleSubmit()}
          disabled={isPending}
        >
          <span className="text-sm text-primary">
            {COMMUNITY_CONSTANT[lang]['post-submit-text']}
          </span>
        </button>
      </div>
      {/* 에디터 */}
      <div className="flex grow flex-col bg-grey-80 px-5 py-4">
        <PostEditor
          title={title}
          imgList={imgList}
          content={content}
          setImgList={setImgList}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>
    </div>
  )
}
export default CommunityPostWritePage
