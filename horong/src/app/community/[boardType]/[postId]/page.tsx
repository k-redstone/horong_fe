import GlobalHeader from '@/components/globalHeader/index.tsx'
import CommentInput from '@/features/community/components/commentInput/index.tsx'
import PostComment from '@/features/community/components/postComment/index.tsx'
import PostContent from '@/features/community/components/postContent/index.tsx'
import CommentIcon from '@/static/svg/community/community-comment-icon.svg'

function CommunityPostDetailPage() {
  const dummDataList = [1]
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="~~ 커뮤니티" />
      <div className="flex grow flex-col gap-y-4 bg-grey-80 px-5 py-4">
        {/* 본문 */}
        <div className="flex h-[36rem] flex-col gap-y-4 overflow-y-scroll">
          <PostContent />

          {/* 댓글 수 */}
          <div className="flex items-center gap-x-2">
            <div className="h-5 w-5">
              <CommentIcon />
            </div>
            <span className="text-xs opacity-60">12</span>
          </div>

          {/* 댓글 컴포 */}
          <div>
            {dummDataList.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-xs text-text-md">
                <span>작성된 댓글이 없습니다.</span>
                <span>첫 번째 댓글을 남겨보세요</span>
              </div>
            ) : (
              <>
                <PostComment />
                <PostComment />
                <PostComment />
                <PostComment />
                <PostComment />
                <PostComment />
              </>
            )}
          </div>
        </div>

        {/* 댓글 입력 컴포 */}
        <CommentInput />
      </div>
    </div>
  )
}

export default CommunityPostDetailPage
