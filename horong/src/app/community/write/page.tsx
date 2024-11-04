'use client'

import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { createPost } from '@/features/community/apis/post/index.ts'
import { PostCreatePayload } from '@/features/community/types/post/index.ts'
import {
  transContentToPostPayload,
  transHTML,
  transText,
} from '@/features/community/utils/editor/index.ts'

const PostEditor = dynamic(
  () => import('@/features/community/components/postEditor/index.tsx'),
  { ssr: false },
)
function CommunityPostWritePage() {
  const router = useRouter()
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imgList, setImgList] = useState<string[]>([])

  const { mutateAsync } = useMutation({
    mutationFn: createPost,
    onSuccess: () => toast.success('생성 성공'),
    onError: () => toast.error('에러임'),
  })

  const handleSubmit = async () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      return toast.error('빈칸이 있습니다!')
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
          <span className="text-sm">취소</span>
        </button>
        <p className="font-bold">
          <span>자유게시판</span>
        </p>
        {/* todo: 사이드바 만들기 */}
        <button
          className="px-2 py-[.1875rem]"
          onClick={() => handleSubmit()}
        >
          <span className="text-sm text-primary">등록</span>
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
