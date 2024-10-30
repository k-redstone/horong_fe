'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'

import MobileIndexModal from '@/components/mobileInfoModal/index.tsx'

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
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isIOS, setIsIOS] = useState<boolean>(false)
  useEffect(() => {
    const userAgent = window.navigator.userAgent
    // console.log(userAgent)

    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      setIsIOS(true)
    }
    if (
      !userAgent.includes('Mobi') &&
      !sessionStorage.getItem('checkedMobileModal')
    ) {
      setIsModal(true)
    }
  }, [])

  return (
    <QueryClientProvider client={client}>
      <MobileIndexModal
        isIOS={isIOS}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
