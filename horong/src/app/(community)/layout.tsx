'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import useNotificationStore from '@/hooks/useNotificationStore.ts'
import BackIconSVG from '@/static/svg/common/common-back-icon.svg'
import SidebaIconSvg from '@/static/svg/common/common-sidebar-icon.svg'
import NotifyIcon from '@/static/svg/inbox/inbox-notify-icon.svg'

declare global {
  interface EventSourceEventMap {
    notification: MessageEvent
    testNotification: MessageEvent
  }
}

function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const lang = useLangStore((state) => state.lang)
  const { initializeEventSource, closeEventSource, messages } =
    useNotificationStore()

  const pageName = (() => {
    if (/^\/community\/free\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['free-header']
    if (/^\/community\/notice\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['notice-header']
    if (/^\/community\/seoul\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['region-subheader-seoul']
    if (/^\/community\/gyeonggi\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['region-subheader-gyeonggi']
    if (/^\/community\/incheon\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['region-subheader-incheon']
    if (/^\/community\/busan\/\d+$/.test(pathname))
      return COMMUNITY_CONSTANT[lang]['region-subheader-busan']

    if (pathname.startsWith('/community'))
      return COMMUNITY_CONSTANT[lang]['page-header']

    if (pathname.startsWith('/inbox'))
      return INBOX_CONSTANT[lang]['inbox-header']
  })()

  useEffect(() => {
    initializeEventSource()

    return () => {
      closeEventSource()
    }
  }, [closeEventSource, initializeEventSource])

  return (
    <div className="flex w-full flex-col">
      {/* 헤더 */}
      {!pathname.includes('/write') && (
        <div className="relative flex w-full items-center justify-between bg-grey-90 px-5 py-4">
          <button
            type="button"
            className="px-1 py-0.5"
            onClick={() => router.back()}
          >
            <BackIconSVG />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 transform font-bold">
            <span>{pageName}</span>
          </p>

          {pathname !== '/signup' && (
            <div className="flex gap-x-5">
              <div className="relative">
                {messages.length >= 1 && (
                  <div className="absolute right-0 h-2 w-2 animate-pulse rounded-full bg-warning" />
                )}
                <NotifyIcon
                  className="cursor-pointer"
                  onClick={() => router.push('/inbox?type=2')}
                />
              </div>
              <Link
                href="/sidebar"
                className="px-2 py-[.1875rem]"
              >
                <SidebaIconSvg />
              </Link>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default CommunityLayout
