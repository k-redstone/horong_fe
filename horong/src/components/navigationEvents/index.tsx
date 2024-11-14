'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { saveChatLog } from '@/features/home/api/chatlog.ts'
import { SaveChatLogPayload } from '@/features/home/types/chatlogType.ts'
import useHorongChatStore from '@/hooks/useHorongChatStore.ts'
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathname = useRef(pathname)
  const { chatList } = useHorongChatStore()

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
    // Check if we're navigating away from '/home'
    if (prevPathname.current === '/home' && pathname !== '/home') {
      // Call your specific function here
      handleNavigateFromHome()
    }

    // Update the previous pathname
    prevPathname.current = pathname
  }, [pathname, searchParams])

  const handleNavigateFromHome = () => {
    saveLog()
    // Add your specific logic here
  }

  return null
}
