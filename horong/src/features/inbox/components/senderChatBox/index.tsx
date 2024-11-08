import { transDateFormat } from '@/features/community/utils/datetime/index.ts'
import { MessagePromise } from '@/features/inbox/types/message/index.ts'
import HorongSVG from '@/static/svg/common/common-horong.svg'

interface SenderChatBoxProps {
  data: MessagePromise
}

function SenderChatBox({ data }: SenderChatBoxProps) {
  console.log(data)
  return (
    <div className="flex gap-x-2">
      {/* 로고영역 */}
      <div className="h-10 w-10 shrink-0">
        <HorongSVG />
      </div>
      {/* 텍스트 영역 */}
      <div className="flex gap-x-1 text-xs text-white">
        {/* 호롱이름 */}
        <div className="px-1 pb-1 text-xs">
          <span className="font-bold">호롱</span>
          {/* 내용 */}
          <div className="max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tr-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
            <p className="flex rounded-bl-xl rounded-br-xl rounded-tr-xl bg-[#1B1D24] px-2.5 py-1">
              <span className="w-fit hyphens-auto break-all bg-[#1B1D24] text-xs text-white">
                {data.content}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-end">
          <span className="text-2xs">{transDateFormat(data.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default SenderChatBox
