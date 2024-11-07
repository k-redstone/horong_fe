'use client'

import { useQuery } from '@tanstack/react-query'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalFooterNav from '@/components/globalFooterNav/index.tsx'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { HOME_CONSTANT } from '@/constants/home/index.ts'
import ChatArea from '@/features/home/components/ChatArea/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

export default function HomePage() {
  const lang = useLangStore((state) => state.lang)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')

      return res.data.result
    },
  })
  return (
    <div className="flex w-full flex-col">
      {/* 헤더 */}
      <GlobalHeader pageName={HOME_CONSTANT[lang]['home-header']} />
      {/* 채팅영역 */}
      <ChatArea />

      <GlobalFooterNav />
    </div>
  )
}
