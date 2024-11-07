'use client'

import { useQuery } from '@tanstack/react-query'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { fetchPreviewBoard } from '@/features/community/apis/post/index.ts'
import {
  PreviewFreeBoard,
  PreviewNoticeBoard,
  PreviewRegionBoard,
} from '@/features/community/components/boardPreview/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

function CommunityMainPage() {
  const lang = useLangStore((state) => state.lang)
  const { data: preveiwData } = useQuery({
    queryKey: ['boardList', { type: 'preview' }],
    queryFn: fetchPreviewBoard,
  })

  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName={`${COMMUNITY_CONSTANT[lang]['page-header']}`} />
      <div className="flex grow flex-col gap-y-4 bg-grey-80 px-6 py-8">
        <PreviewNoticeBoard data={preveiwData?.NOTICE} />
        <PreviewFreeBoard data={preveiwData?.FREE} />
        <PreviewRegionBoard data={preveiwData} />
      </div>
    </div>
  )
}

export default CommunityMainPage
