import CommentSendSVG from '@/static/svg/community/community-comment-send-icon.svg'

interface CommentInputProps {
  type: string
}

function CommentInput(props: CommentInputProps) {
  return (
    <div className="flex gap-x-3 py-2">
      <input
        className="box-border grow rounded-lg border border-text-disabled bg-grey-80 px-3 text-xs text-text-md focus:outline-none"
        type="text"
        placeholder="댓글을 입력해주세요."
      />
      <button className="shrink-0">
        <CommentSendSVG />
      </button>
    </div>
  )
}

export default CommentInput
