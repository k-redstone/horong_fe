import { transDateFormat } from '@/features/community/utils/datetime/index.ts'
import { MessageAllPromise } from '@/features/inbox/types/message/index.ts'
interface MessageCardProps {
  data: MessageAllPromise
}

function MessageCard({ data }: MessageCardProps) {
  return (
    <div className="flex gap-x-2 rounded-xl border border-white p-3">
      <div className="relative h-[3.125rem] w-[3.125rem] rounded-full bg-white">
        {data.messageCount >= 1 && (
          <div className="absolute right-0 h-3 w-3 rounded-full bg-warning" />
        )}
      </div>
      <div className="flex w-[15.375rem] flex-col gap-y-1">
        <div className="flex justify-between">
          <span className="text-xs font-bold">{data.senderNickname}</span>
          <span className="text-2xs text-text-md">
            {transDateFormat(data.createdAt)}
          </span>
          <span>{data.messageCount}</span>
        </div>
        <p className="line-clamp-2 h-8 grow text-xs">{data.content}</p>
      </div>
    </div>
  )
}

export default MessageCard
