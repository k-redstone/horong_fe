import HorongSVG from '@/static/svg/common/common-horong.svg'
interface HorongChatBoxProps {
  text: string
}

export default function HorongChatBox({ text }: HorongChatBoxProps) {
  return (
    <div className="flex gap-x-2">
      {/* 로고영역 */}
      <div className="h-10 w-10 shrink-0">
        <HorongSVG />
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-col pr-2.5 text-xs text-white">
        {/* 호롱이름 */}
        <p className="font-bold">
          <span>호롱</span>
        </p>
        {/* 내용 */}
        <p>{text}</p>
      </div>
    </div>
  )
}
