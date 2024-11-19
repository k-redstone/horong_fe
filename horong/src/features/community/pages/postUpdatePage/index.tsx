'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import {
  fetchOriginalPost,
  updatePost,
} from '@/features/community/apis/post/index.ts'
import { PostUpdatePayload } from '@/features/community/types/post/index.ts'
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

interface PostUpdatePageProps {
  postId: number
  handleUpdateClose: () => void
}

function PostUpdatePage(props: PostUpdatePageProps) {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const lang = useLangStore((state) => state.lang)

  const { data: originalPostData, isSuccess } = useQuery({
    queryKey: ['originPost'],
    queryFn: () => fetchOriginalPost(props.postId),
    staleTime: 0,
  })

  const [isPending, setIsPending] = useState<boolean>(false)

  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imgList, setImgList] = useState<string[]>([])

  const { mutateAsync: postMutation } = useMutation({
    mutationFn: (payload: PostUpdatePayload) =>
      updatePost(props.postId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', props.postId],
      })
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

        const contentListPaylaod = transContentToPostPayload(
          translatedContent,
          translatedTitle,
        )
        contentListPaylaod.push({
          title: title.trim(),
          content: content.trim(),
          isOriginal: true,
        })
        const payload: PostUpdatePayload = {
          title: title,
          content: contentListPaylaod,
          contentImageRequest: imgList.map((img) => {
            return {
              imageUrl: img,
            }
          }),
        }

        await postMutation(payload)
      })(),
      {
        loading: COMMUNITY_CONSTANT[lang]['post-submit-toast-loading'],
        success: COMMUNITY_CONSTANT[lang]['post-submit-toast-success'],
        error: COMMUNITY_CONSTANT[lang]['post-submit-toast-fail'],
      },
    )
  }

  useEffect(() => {
    if (originalPostData) {
      setContent(originalPostData.post.contents || '')
      setTitle(originalPostData.post.title || '')

      setImgList(
        originalPostData.images.map((item) => {
          return `https://horong-service.s3.ap-northeast-2.amazonaws.com/${item}`
        }) || [],
      )
    }
  }, [originalPostData])

  return (
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-full flex-col bg-black">
      {/* 헤더 */}
      <div className="flex w-full items-center justify-between px-5 py-4">
        <button
          type="button"
          className="px-1 py-0.5"
          onClick={props.handleUpdateClose}
        >
          <span className="text-sm">
            {COMMUNITY_CONSTANT[lang]['cancel-text']}
          </span>
        </button>

        <p className="font-bold">
          <span> {COMMUNITY_CONSTANT[lang]['post-edit-header']}</span>
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
      )}
    </div>
  )
}

export default PostUpdatePage
