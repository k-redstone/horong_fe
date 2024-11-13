'use client'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import { transFullTime } from '@/features/community/utils/datetime/index.ts'
import { NotifyPromise } from '@/features/inbox/types/message/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ImgIcon from '@/static/svg/inbox/inbox-img-icon.svg'

interface NotifyCardProps {
  data: NotifyPromise
}

function NotifyCard({ data }: NotifyCardProps) {
  const lang = useLangStore((state) => state.lang)
  console.log(data)

  return (
    <div className="flex w-[21rem] flex-col gap-y-1 rounded-xl border border-grey-60 px-4 py-3">
      <div className="flex justify-between text-2xs">
        <span>{data.senderName}</span>
        <span className="text-text-disabled">
          {transFullTime(data.createdAt)}
        </span>
      </div>
      <div className="text-xs">
        <span className="font-bold">
          {data.type === 'COMMENT' && <span>{data.postContent?.title}</span>}
          {data.type === 'MESSAGE' && (
            <span>
              {data.messageContent?.message == '' ? (
                <ImgIcon />
              ) : (
                data.messageContent?.message
              )}
            </span>
          )}
        </span>
      </div>
      <div className="text-xs">
        {data.type === 'COMMENT' && (
          <span>{INBOX_CONSTANT[lang]['notify-new-comment-txt']}</span>
        )}
        {data.type === 'MESSAGE' && (
          <span>{INBOX_CONSTANT[lang]['notify-new-message-txt']}</span>
        )}
      </div>
    </div>
  )
}

export default NotifyCard
