import ChatArea from '@/features/home/components/ChatArea/index.tsx'
import HomeHeader from '@/features/home/components/HomeHeader/index.tsx'

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      {/* 헤더 */}
      <HomeHeader />
      {/* 채팅영역 */}
      <ChatArea />
      <div className="h-[5.3125rem] w-full">
        <p>bottom nav</p>
      </div>
    </div>
  )
}
