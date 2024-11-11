import { transFullTime } from '@/features/community/utils/datetime/index.ts'

interface NotifyCardProps {
  data: object
}

function NotifyCard({ data }: NotifyCardProps) {
  console.log(data)

  return (
    <div className="flex w-[21rem] flex-col gap-y-1 rounded-xl border border-grey-60 px-4 py-3">
      <div className="flex justify-between text-2xs">
        <span>닉네임</span>
        <span className="text-text-disabled">
          {transFullTime('2024-11-11T12:52:02.526626')}
        </span>
      </div>
      <div className="text-xs">
        <span className="font-bold">제목</span>
      </div>
      <div className="text-xs">
        <span>내용</span>
      </div>
    </div>
  )
}

export default NotifyCard
