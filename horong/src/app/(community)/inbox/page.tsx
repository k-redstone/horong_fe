import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import InboxPage from '@/features/inbox/pages/inboxPage.tsx'

function InboxPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderIcon />
        </div>
      }
    >
      <InboxPage />
    </Suspense>
  )
}

export default InboxPageWrapper
