'use client'

import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { createPost } from '@/features/community/apis/post/index.ts'
import { PostCreatePayload } from '@/features/community/types/post/index.ts'
import {
  transContentToPostPayload,
  transHTML,
  transText,
} from '@/features/community/utils/editor/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
const PostEditor = dynamic(
  () => import('@/features/community/components/postEditor/index.tsx'),
  { ssr: false },
)

function CommunityPostWritePage() {
  const lang = useLangStore((state) => state.lang)
  const router = useRouter()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imgList, setImgList] = useState<string[]>([])

  const { mutateAsync } = useMutation({
    mutationFn: createPost,
    onSuccess: () =>
      toast.success(`${COMMUNITY_CONSTANT[lang]['post-submit-toast-success']}`),
    onError: () =>
      toast.error(`${COMMUNITY_CONSTANT[lang]['post-submit-toast-fail']}`),
  })

  const handleSubmit = async () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      return toast.error(`${COMMUNITY_CONSTANT[lang]['post-submit-is-blank']}`)
    }

    const translatedContent = await transHTML(content)
    const translatedTitle = await transText(title)
    console.log(transContentToPostPayload(translatedContent, translatedTitle))
    console.log(imgList)
    const payload: PostCreatePayload = {
      content: transContentToPostPayload(translatedContent, translatedTitle),
      boardType: 'FREE',
      contentImageRequest: imgList.map((img) => {
        return {
          imageUrl: img,
        }
      }),
    }
    mutateAsync(payload)
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
          <span>자유게시판</span>
        </p>
        {/* todo: 사이드바 만들기 */}
        <button
          className="px-2 py-[.1875rem]"
          onClick={() => handleSubmit()}
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
          setImgList={setImgList}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>
    </div>
  )
}
export default CommunityPostWritePage
