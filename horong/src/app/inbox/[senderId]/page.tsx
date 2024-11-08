'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { fetchMessage } from '@/features/inbox/apis/message/index.ts'
import SenderChatBox from '@/features/inbox/components/senderChatBox/index.tsx'
interface InboxMessagePageProps {
  params: {
    senderId: number
  }
}

function InboxMessagePage({ params }: InboxMessagePageProps) {
  const queryClient = useQueryClient()

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ['message', { type: params.senderId }],
    queryFn: () => fetchMessage(params.senderId),
    staleTime: 0,
  })

  useEffect(() => {
    if (isSuccess) {
      console.log('asfef')
      queryClient.invalidateQueries({ queryKey: ['message', { type: 'all' }] })
    }
  }, [isSuccess])

  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="알림 및 쪽지" />
      <div className="grow bg-grey-80">
        {isSuccess && (
          <div className="flex flex-col gap-y-4 px-3 py-4">
            {data.map((item) => (
              <SenderChatBox
                key={crypto.randomUUID()}
                data={item}
              />
            ))}
          </div>
        )}
        {isPending && (
          <div className="flex h-full items-center justify-center">
            <LoaderIcon />
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center">
            <p>쪽지를 불러오다가 오류가 발생했어요.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InboxMessagePage
