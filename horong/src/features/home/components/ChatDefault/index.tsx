import HorongSVG from '@/static/svg/common/common-horong.svg'

export default function ChatDefault() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="h-20 w-20 animate-pulse">
        <HorongSVG />
      </div>
      <div className="flex flex-col items-center">
        <p>안녕하세요, 호롱입니다 :D</p>
        <p>궁금하신게 있으시면 편하게 말씀해주세요 ❤</p>
      </div>
    </div>
  )
}
