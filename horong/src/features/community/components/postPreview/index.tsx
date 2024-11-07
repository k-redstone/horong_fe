'use client'
import { PostPromise } from '@/features/community/types/post/index.ts'
import { transDateFormat } from '@/features/community/utils/datetime/index.ts'
import CommentIcon from '@/static/svg/community/community-comment-icon.svg'

interface PostPreviewProps {
  data: PostPromise
}

function PostPreview(props: PostPreviewProps) {
  const { title, nickname, createdAt, comments } = props.data
  return (
    <div className="flex flex-col gap-y-1 rounded-xl border border-grey-60 p-3">
      <div className="flex">
        <span className="truncate text-xs">{title}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xs opacity-60">{nickname}</span>
        <p className="flex grow items-center justify-end gap-x-3">
          <span className="flex items-center justify-center gap-x-1 text-2xs opacity-60">
            <span className="h-3 w-3">
              <CommentIcon />
            </span>
            {comments.length}
          </span>
          <span className="text-2xs opacity-60">
            {transDateFormat(createdAt)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default PostPreview
