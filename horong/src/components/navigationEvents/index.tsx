'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { saveChatLog } from '@/features/home/api/chatlog.ts'
import { SaveChatLogPayload } from '@/features/home/types/chatlogType.ts'
import useHorongChatStore from '@/hooks/useHorongChatStore.ts'
import useLangStore from '@/hooks/useLangStore.ts'
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathname = useRef(pathname)
  const { chatList } = useHorongChatStore()
  const initLnag = useLangStore((state) => state.initLang)

  const saveLog = () => {
    if (chatList.length >= 2) {
      const payload: SaveChatLogPayload = {
        chatContents: chatList.map((item) => {
          return {
            content: item.text,
            authorType: item.type === 'horong' ? 'BOT' : 'USER',
          }
        }),
      }
      saveChatLog(payload)
    }
  }

  useEffect(() => {
    if (prevPathname.current === '/home' && pathname !== '/home') {
      handleNavigateFromHome()
    }

    prevPathname.current = pathname

    initLnag()
  }, [pathname, searchParams])

  const handleNavigateFromHome = () => {
    saveLog()
  }

  return null
}
