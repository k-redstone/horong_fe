'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import { fetchAllMessage } from '@/features/inbox/apis/message/index.ts'
import MessageCard from '@/features/inbox/components/messageCard/index.tsx'

function MessageListBox() {
  const { data, isSuccess, isError, isPending, refetch } = useQuery({
    queryKey: ['message', { type: 'all' }],
    queryFn: fetchAllMessage,
  })

  if (isError) {
    return (
      <div className="flex justify-center">
        <p>쪽지를 불러오다가 오류가 발생했어요.</p>
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
            href={`/inbox/${item.senderId}`}
            onClick={() => refetch()}
          >
            <MessageCard data={item} />
          </Link>
        ))}
      </div>
    )
  }
}

export default MessageListBox
