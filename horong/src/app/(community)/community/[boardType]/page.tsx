'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import {
  fetchBoard,
  fetchSearchResult,
} from '@/features/community/apis/post/index.ts'
import BoardTitle from '@/features/community/components/boardTitle/index.tsx'
import PostPreview from '@/features/community/components/postPreview/index.tsx'
import SearchInput from '@/features/community/components/searchInput/index.tsx'
import { useObserver } from '@/features/community/hooks/useObserver/index.tsx'
import { transPathtoPayloadBoardType } from '@/features/community/utils/editor/index.ts'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import PostIconSVG from '@/static/svg/community/community-post-icon.svg'
interface CommunityBoardPageProps {
  params: { boardType: CommunityPathType }
}

function CommunityBoardPage({ params }: CommunityBoardPageProps) {
  const bottom = useRef(null)
  const [isSearchTriggered, setIsSearchTriggered] = useState(false)
  const [searchTxt, setSearchTxt] = useState<string>('')
  const lang = useLangStore((state) => state.lang)
  const router = useRouter()

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  const { data: searchData, isSuccess: searchSuccess } = useInfiniteQuery({
    queryKey: ['boardList', { type: 'search', keyword: searchTxt }],
    queryFn: ({ pageParam = 0 }) =>
      fetchSearchResult(searchTxt, {
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page.totalPages === lastPage.page.number + 1 ||
      lastPage.page.totalPages === 0
        ? undefined
        : lastPage.page.number + 1,
    initialPageParam: 0,
    enabled: isSearchTriggered,
  })

  const handlePostWrite = (boardType: CommunityPathType) => {
    router.push(`/community/${boardType}/write`)
  }
  const handlePostDetail = (boardType: CommunityPathType, postId: number) => {
    router.push(`/community/${boardType}/${postId}`)
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex grow flex-col gap-y-3 bg-grey-80 py-4">
        <BoardTitle boardType={params.boardType} />

        {searchSuccess ? (
          searchData?.pages[0].content.length === 0 ? (
            <p className="tex-xs flex justify-center py-10">
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            <>
              <SearchInput
                boardType="notice"
                setIsSearchTriggered={setIsSearchTriggered}
                setSearchTxt={setSearchTxt}
              />
              <div className="flex h-[calc(100dvh-12.25rem)] flex-col gap-y-3 overflow-y-scroll px-3">
                {searchData?.pages.map((page) =>
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
                <div ref={bottom} />
              </div>
            </>
          )
        ) : data?.pages[0].content.length === 0 ? (
          <p className="tex-xs flex justify-center py-10">
            <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
          </p>
        ) : (
          <>
            <SearchInput
              boardType="notice"
              setIsSearchTriggered={setIsSearchTriggered}
              setSearchTxt={setSearchTxt}
            />
            <div className="flex h-[calc(100dvh-12.25rem)] flex-col gap-y-3 overflow-y-scroll px-3">
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
              <div ref={bottom} />
            </div>
          </>
        )}
      </div>
      {params.boardType !== 'notice' && (
        <div className="absolute bottom-10 right-5 z-30">
          <PostIconSVG
            className="cursor-pointer"
            onClick={() => handlePostWrite(params.boardType)}
          />
        </div>
      )}
    </div>
  )
}

export default CommunityBoardPage
