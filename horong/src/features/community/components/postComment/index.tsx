import { CommentPromise } from '@/features/community/types/post/index.ts'
import HorongSVG from '@/static/svg/common/common-horong.svg'

interface postCommentProps {
  data: CommentPromise
}

function postComment(props: postCommentProps) {
  const { nickname, contents, createdDate } = props.data

  return (
    <div className="py-2">
      <div className="flex gap-x-2">
        {/* 프로필 이미지 */}
        <div className="h-[2.875rem] w-[2.875rem] shrink-0">
          <HorongSVG className="h-full w-full" />
        </div>

        <div className="flex grow flex-col gap-y-2">
          <div className="flex gap-x-2">
            {/* 작성자 및 작성 시간 */}
            <div className="flex grow flex-col gap-y-1">
              <span className="text-xs">{nickname}</span>
              <span className="text-2xs opacity-60">{createdDate}</span>
            </div>
            {/* dm 전송 버튼 */}
            <div>
              <button className="rounded-2xl border border-text-disabled px-2 py-1 text-2xs text-text-disabled">
                DM전송
              </button>
            </div>
          </div>

          {/* 실제 댓글 */}
          <p className="text-xs opacity-60">{contents}</p>
        </div>
      </div>
    </div>
  )
}

export default postComment
