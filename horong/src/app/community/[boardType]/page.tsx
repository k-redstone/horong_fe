'use client'

import { notFound } from 'next/navigation'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import BoardTitle from '@/features/community/components/boardTitle/index.tsx'
import PostPreview from '@/features/community/components/postPreview/index.tsx'
import SearchInput from '@/features/community/components/searchInput/index.tsx'
import {
  allowedPaths,
  CommunityPathType,
} from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface CommunityBoardPageProps {
  params: { boardType: CommunityPathType }
}

function CommunityBoardPage({ params }: CommunityBoardPageProps) {
  const lang = useLangStore((state) => state.lang)

  if (!allowedPaths.includes(params.boardType)) {
    notFound()
  }
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName={`${COMMUNITY_CONSTANT[lang]['page-header']}`} />
      <div className="flex grow flex-col gap-y-3 bg-grey-80 py-4">
        <BoardTitle boardType={params.boardType} />
        <SearchInput boardType="notice" />
        <div className="flex flex-col gap-y-3 px-3">
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
        </div>
      </div>
    </div>
  )
}

export default CommunityBoardPage
