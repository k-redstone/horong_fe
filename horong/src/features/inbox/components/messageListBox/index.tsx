'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import { fetchAllMessage } from '@/features/inbox/apis/message/index.ts'
import MessageCard from '@/features/inbox/components/messageCard/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

function MessageListBox() {
  const lang = useLangStore((state) => state.lang)
  const { data, isSuccess, isError, isPending, refetch } = useQuery({
    queryKey: ['message', { type: 'all' }],
    queryFn: fetchAllMessage,
  })

  if (isError) {
    return (
      <div className="flex justify-center">
        <p>{INBOX_CONSTANT[lang]['message-fetch-error']}</p>
      </div>
    )
  }
  if (isPending) {
    return (
      <div className="flex justify-center">
        <LoaderIcon />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-y-3 px-6 pb-8">
        {data.map((item) => (
          <Link
            key={crypto.randomUUID()}
            href={`/inbox/${item.roomId}`}
            onClick={() => refetch()}
          >
            <MessageCard data={item} />
          </Link>
        ))}
        {data.length === 0 && (
          <div>
            <p>{INBOX_CONSTANT[lang]['message-no-item-txt']}</p>
          </div>
        )}
      </div>
    )
  }
}

export default MessageListBox
