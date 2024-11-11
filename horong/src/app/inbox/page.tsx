'use client'

import { useState } from 'react'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { INBOX_CONSTANT } from '@/constants/inbox/index.ts'
import MessageListBox from '@/features/inbox/components/messageListBox/index.tsx'
import NotifyListBox from '@/features/inbox/components/notifyListBox/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

function InboxPage() {
  const lang = useLangStore((state) => state.lang)
  const [selectedTap, setSelectedTap] = useState<number>(1)

  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName={INBOX_CONSTANT[lang]['inbox-header']} />
      <div className="grow bg-grey-80">
        <div className="flex justify-center gap-x-5 px-6 py-8">
          <button
            type="button"
            className={`w-[8.5rem] rounded-lg py-2 text-xs ${selectedTap === 1 ? `bg-primary text-black` : `bg-grey-70`}`}
            onClick={() => setSelectedTap(1)}
          >
            {INBOX_CONSTANT[lang]['meesage-header']}
          </button>
          <button
            type="button"
            className={`w-[8.5rem] rounded-lg py-2 text-xs ${selectedTap === 2 ? `bg-primary text-black` : `bg-grey-70`}`}
            onClick={() => setSelectedTap(2)}
          >
            {INBOX_CONSTANT[lang]['notify-header']}
          </button>
        </div>

        {selectedTap === 1 && <MessageListBox />}
        {selectedTap === 2 && <NotifyListBox />}
      </div>
    </div>
  )
}

export default InboxPage
