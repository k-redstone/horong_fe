import Image from 'next/image'

import { transFullTime } from '@/features/community/utils/datetime/index.ts'
import { MessagePromise } from '@/features/inbox/types/message/index.ts'
interface UserChatBoxProps {
  data: MessagePromise
}

function UserChatBox({ data }: UserChatBoxProps) {
  return (
    <div className="flex w-full justify-end gap-x-2">
      <div className="flex items-end">
        <span className="text-2xs">{transFullTime(data.createdAt)}</span>
      </div>
      <div className="max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tl-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
        <p className="flex rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[#1B1D24] px-2.5 py-1">
          <span className="w-fit hyphens-auto break-all bg-[#1B1D24] text-xs text-white">
            {data.content ? (
              data.content
            ) : (
              <Image
                src={data.image}
                alt={'chat image'}
                width={280}
                height={228}
              />
            )}
          </span>
        </p>
      </div>
    </div>
  )
}

export default UserChatBox
