'use client'

import { useState } from 'react'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import MessageListBox from '@/features/inbox/components/messageListBox/index.tsx'
import NotifyListBox from '@/features/inbox/components/notifyListBox/index.tsx'

function InboxPage() {
  const [selectedTap, setSelectedTap] = useState<number>(1)

  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="알림 및 쪽지" />
      <div className="grow bg-grey-80">
        <div className="flex justify-center gap-x-5 px-6 py-8">
          <button
            type="button"
            className={`w-[8.5rem] rounded-lg py-2 text-xs ${selectedTap === 1 ? `bg-primary text-black` : `bg-grey-70`}`}
            onClick={() => setSelectedTap(1)}
          >
            쪽지
          </button>
          <button
            type="button"
            className={`w-[8.5rem] rounded-lg py-2 text-xs ${selectedTap === 2 ? `bg-primary text-black` : `bg-grey-70`}`}
            onClick={() => setSelectedTap(2)}
          >
            알림
          </button>
        </div>

        {selectedTap === 1 && <MessageListBox />}
        {selectedTap === 2 && <NotifyListBox />}
      </div>
    </div>
  )
}

export default InboxPage
