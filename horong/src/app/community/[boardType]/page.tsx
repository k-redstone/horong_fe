'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { fetchBoard } from '@/features/community/apis/post/index.ts'
import BoardTitle from '@/features/community/components/boardTitle/index.tsx'
import PostPreview from '@/features/community/components/postPreview/index.tsx'
import SearchInput from '@/features/community/components/searchInput/index.tsx'
import { transPathtoPayloadBoardType } from '@/features/community/utils/editor/index.ts'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import PostIconSVG from '@/static/svg/community/community-post-icon.svg'
interface CommunityBoardPageProps {
  params: { boardType: CommunityPathType }
}

function CommunityBoardPage({ params }: CommunityBoardPageProps) {
  const lang = useLangStore((state) => state.lang)
  const router = useRouter()
  const { data } = useInfiniteQuery({
    queryKey: ['boardList', { type: params.boardType }],
    queryFn: ({ pageParam = 0 }) =>
      fetchBoard(transPathtoPayloadBoardType(params.boardType), {
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
  })

  const handlePostWrite = (boardType: CommunityPathType) => {
    router.push(`/community/${boardType}/write`)
  }
  const handlePostDetail = (boardType: CommunityPathType, postId: number) => {
    router.push(`/community/${boardType}/${postId}`)
  }

  return (
    <div className="relative flex w-full flex-col">
      <GlobalHeader pageName={`${COMMUNITY_CONSTANT[lang]['page-header']}`} />
      <div className="flex grow flex-col gap-y-3 bg-grey-80 py-4">
        <BoardTitle boardType={params.boardType} />

        {data?.pages[0].content.length === 0 ? (
          <p className="tex-xs flex justify-center py-10">
            <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
          </p>
        ) : (
          <>
            <SearchInput boardType="notice" />
            <div className="flex flex-col gap-y-3 px-3">
              {data?.pages.map((page) =>
                page.content.map((item) => (
                  <button
                    key={item.postId}
                    onClick={() =>
                      handlePostDetail(params.boardType, item.postId)
                    }
                  >
                    <PostPreview data={item} />
                  </button>
                )),
              )}
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-10 right-5 z-30">
        <PostIconSVG
          className="cursor-pointer"
          onClick={() => handlePostWrite(params.boardType)}
        />
      </div>
    </div>
  )
}

export default CommunityBoardPage
