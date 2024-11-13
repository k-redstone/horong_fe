'use client'

import Link from 'next/link'

import privateAPI from '@/api/privateAPI/index.ts'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import NotifyCard from '@/features/inbox/components/notifyCard/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import useNotificationStore from '@/hooks/useNotificationStore.ts'

function NotifyListBox() {
  const lang = useLangStore((state) => state.lang)
  const { messages, removeMessage } = useNotificationStore()

  const handleReadNotify = async (
    notificationId: number,
    type: 'COMMENT' | 'MESSAGE',
  ) => {
    const params = {
      notificationId: notificationId,
      type: type,
    }
    await privateAPI.post(`/notifications/${notificationId}`, null, { params })

    removeMessage(notificationId)
  }

  return (
    <div className="flex max-h-[calc(100dvh-13.25rem)] flex-col items-center gap-y-3 overflow-y-scroll px-3 pb-8">
      {messages.map((item) => (
        <Link
          key={crypto.randomUUID()}
          // todo: 게시글 타입 반영
          href={
            item.type === 'COMMENT'
              ? `/community/${item.postContent?.type.toLowerCase()}/${item.postContent?.postId}`
              : `/inbox/${item.messageContent?.roomId}`
          }
          onClick={() => handleReadNotify(item.id, item.type)}
        >
          <NotifyCard data={item} />
        </Link>
      ))}
      {messages.length === 0 && (
        <div>
          <p>{INBOX_CONSTANT[lang]['notify-no-item-txt']}</p>
        </div>
      )}
    </div>
  )
}

export default NotifyListBox
