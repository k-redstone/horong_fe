'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import MobileIndexModal from '@/components/mobileInfoModal/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

export default function TanstackQueryProvider({
  children,
}: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 10, // 10분
        },
      },
    }),
  )

  //최초에 접속기기 확인
  const pathname = usePathname()
  const router = useRouter()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isIOS, setIsIOS] = useState<boolean>(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    checkToken()

    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      document.body.classList.add('ios')
      setIsIOS(true)
    }
    if (
      !userAgent.includes('Mobi') &&
      !sessionStorage.getItem('checkedMobileModal')
    ) {
      setIsModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkToken = () => {
    const token = sessionStorage.getItem('token')

    if (token !== null && pathname === '/') {
      router.push('/home')
    } else if (
      token !== null &&
      (pathname.includes('/login') || pathname.includes('/signup'))
    ) {
      router.push('/')
    } else if (
      token === null &&
      !pathname.includes('/login') &&
      !pathname.includes('/signup') &&
      pathname !== '/'
    ) {
      router.push('/')
    }
  }

  const lang = useLangStore((state) => state.lang)
  return (
    <div
      className={`h-full min-h-dvh w-full ${lang === 'JAPANESE' && '!font-notoSansJp'} ${lang === 'CHINESE' && '!font-notoSansChinese'} flex w-full justify-center bg-inherit font-pretendard`}
    >
      <QueryClientProvider client={client}>
        <MobileIndexModal
          isIOS={isIOS}
          isModal={isModal}
          setIsModal={setIsModal}
        />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}
