'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchPreviewBoard } from '@/features/community/apis/post/index.ts'
import {
  PreviewFreeBoard,
  PreviewNoticeBoard,
  PreviewRegionBoard,
} from '@/features/community/components/boardPreview/index.tsx'

function CommunityMainPage() {
  const { data: preveiwData } = useQuery({
    queryKey: ['boardList', { type: 'preview' }],
    queryFn: fetchPreviewBoard,
  })

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex grow flex-col gap-y-4 bg-grey-80 px-6 py-8">
        <PreviewNoticeBoard data={preveiwData?.NOTICE} />
        <PreviewFreeBoard data={preveiwData?.FREE} />
        <PreviewRegionBoard data={preveiwData} />
      </div>
    </div>
  )
}

export default CommunityMainPage
