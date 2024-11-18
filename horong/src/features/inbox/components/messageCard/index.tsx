import Image from 'next/image'

import { transDateFormat } from '@/features/community/utils/datetime/index.ts'
import { MessageAllPromise } from '@/features/inbox/types/message/index.ts'
import ImgIcon from '@/static/svg/inbox/inbox-img-icon.svg'
interface MessageCardProps {
  data: MessageAllPromise
}

function MessageCard({ data }: MessageCardProps) {
  return (
    <div className="flex gap-x-2 rounded-xl border border-white p-3">
      <div className="relative h-[3.125rem] w-[3.125rem] rounded-full">
        {data.messageCount >= 1 && (
          <div className="absolute right-0 z-30 h-3 w-3 rounded-full bg-warning" />
        )}
        <Image
          className="relative h-[3.125rem] w-[3.125rem] rounded-full"
          src={data.profileImage}
          alt={'profile'}
          width={50}
          height={50}
        />
      </div>
      <div className="flex w-[15.375rem] flex-col gap-y-1">
        <div className="flex justify-between">
          <span className="text-xs font-bold">{data.senderNickname}</span>
          <span className="text-2xs text-text-md">
            {transDateFormat(data.createdAt)}
          </span>
        </div>
        <p className="line-clamp-2 h-8 grow text-xs">
          {data.content ? data.content : <ImgIcon />}
        </p>
      </div>
    </div>
  )
}

export default MessageCard
