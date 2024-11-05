'use client'
import { useQuery } from '@tanstack/react-query'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { fetchPost } from '@/features/community/apis/post/index.ts'
import CommentInput from '@/features/community/components/commentInput/index.tsx'
import PostComment from '@/features/community/components/postComment/index.tsx'
import PostContent from '@/features/community/components/postContent/index.tsx'
import { BoardType } from '@/features/community/types/post/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import CommentIcon from '@/static/svg/community/community-comment-icon.svg'

interface CommunityPostDetailPage {
  params: {
    postId: string
    boardType: BoardType
  }
}

function CommunityPostDetailPage({ params }: CommunityPostDetailPage) {
  const lang = useLangStore((state) => state.lang)
  const { data, isSuccess } = useQuery({
    queryKey: ['postDetail', parseInt(params.postId)],
    queryFn: () => fetchPost(parseInt(params.postId)),
  })

  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="~~ 커뮤니티" />

      {isSuccess ? (
        <div className="flex grow flex-col gap-y-4 bg-grey-80 px-5 py-4">
          {/* 본문 */}
          <div className="flex h-[36rem] flex-col gap-y-4 overflow-y-scroll">
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
                    key={item.id}
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
            boardType={params.boardType}
          />
        </div>
      ) : (
        <div>
          <p>loading.......</p>
        </div>
      )}
    </div>
  )
}

export default CommunityPostDetailPage
