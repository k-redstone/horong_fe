import Image from 'next/image'

import useModal from '@/features/community/hooks/useModal/index.tsx'
import { transFullTime } from '@/features/community/utils/datetime/index.ts'
import ImageModal from '@/features/inbox/components/imageModal/index.tsx'
import { MessagePromise } from '@/features/inbox/types/message/index.ts'
interface SenderChatBoxProps {
  data: MessagePromise
}

function SenderChatBox({ data }: SenderChatBoxProps) {
  const { handleModalOpen, isModalOpen, handleModalClose } = useModal()
  return (
    <>
      {isModalOpen && (
        <ImageModal
          handleModalClose={handleModalClose}
          image={data.image}
        />
      )}
      <div className="flex gap-x-2">
        {/* 로고영역 */}
        <div className="h-10 w-10 shrink-0">
          <Image
            src={data.profileImage}
            alt={'profile'}
            width={40}
            height={40}
          />
        </div>
        {/* 텍스트 영역 */}
        <div className="flex gap-x-1 text-xs text-white">
          {/* 호롱이름 */}
          <div className="flex flex-col gap-y-1 px-1 pb-1 text-xs">
            <span className="font-bold">{data.senderNickname}</span>
            {/* 내용 */}
            <div className="max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tr-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
              <p className="flex rounded-bl-xl rounded-br-xl rounded-tr-xl bg-[#1B1D24] px-2.5 py-1">
                <span className="w-fit hyphens-auto break-all bg-[#1B1D24] text-xs text-white">
                  {data.content ? (
                    data.content
                  ) : (
                    <div onClick={handleModalOpen}>
                      <Image
                        src={data.image}
                        alt={'chat image'}
                        width={280}
                        height={228}
                      />
                    </div>
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-end">
            <span className="text-2xs">{transFullTime(data.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SenderChatBox
