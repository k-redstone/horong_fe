'use client'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { LoaderIcon } from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { fetchPost } from '@/features/community/apis/post/index.ts'
import CommentInput from '@/features/community/components/commentInput/index.tsx'
import PostComment from '@/features/community/components/postComment/index.tsx'
import PostContent from '@/features/community/components/postContent/index.tsx'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import CommentIcon from '@/static/svg/community/community-comment-icon.svg'
interface CommunityPostDetailPage {
  params: {
    postId: string
    boardType: CommunityPathType
  }
}

function CommunityPostDetailPage({ params }: CommunityPostDetailPage) {
  const lang = useLangStore((state) => state.lang)
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['postDetail', parseInt(params.postId)],
    queryFn: () => fetchPost(parseInt(params.postId)),
    retry: 1,
  })

  return (
    <div className="flex h-full w-full flex-col">
      {isSuccess ? (
        <div className="flex grow flex-col gap-y-4 bg-grey-80 px-5 py-4">
          {/* 본문 */}
          <div className="flex h-[calc(100dvh-10.25rem)] flex-col gap-y-4 overflow-y-scroll">
            <PostContent data={data} />

            {/* 댓글 수 */}
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-5">
                <CommentIcon />
              </div>
              <span className="text-xs opacity-60">
                {data?.comments.length}
              </span>
            </div>

            {/* 댓글 컴포 */}
            <div>
              {data.comments.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-xs text-text-md">
                  <span>{COMMUNITY_CONSTANT[lang]['comment-none-text1']}</span>
                  <span>{COMMUNITY_CONSTANT[lang]['comment-none-text2']}</span>
                </div>
              ) : (
                data.comments.map((item) => (
                  <PostComment
                    key={crypto.randomUUID()}
                    postId={data.postId}
                    data={item}
                  />
                ))
              )}
            </div>
          </div>

          {/* 댓글 입력 컴포 */}
          <CommentInput
            postId={parseInt(params.postId)}
            boardUserId={data.userId}
            boardType={params.boardType}
          />
        </div>
      ) : isError ? (
        notFound()
      ) : (
        <div className="flex h-full items-center justify-center">
          <LoaderIcon />
        </div>
      )}
    </div>
  )
}

export default CommunityPostDetailPage
