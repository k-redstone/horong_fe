'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import { ISSUE_CONSTANTS } from '@/constants/issue/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import LikeOffSVG from '@/static/svg/issue/issue-post-like-off-icon.svg'
import LikeOnSVG from '@/static/svg/issue/issue-post-like-on-icon.svg'
import ScrapOffSVG from '@/static/svg/issue/issue-post-scrap-off-icon.svg'
import ScrapOnSVG from '@/static/svg/issue/issue-post-scrap-on-icon.svg'
import UnLikeOffSVG from '@/static/svg/issue/issue-post-unlike-off-icon.svg'
import UnLikeOnSVG from '@/static/svg/issue/issue-post-unlike-on-icon.svg'

interface ShortFormGridType {
  id: number
  content: string
  image: string
  audio: string
  is_saved: boolean
  preference: number
}

function IssueDetail({ params }: { params: { postId: string } }) {
  const [liked, setLiked] = useState(false)
  const [unliked, setUnliked] = useState(false)
  const [scraped, setScraped] = useState(false)
  const scrollPos = useRef<HTMLDivElement>(null)

  const [isCollapsed, setIsCollapsed] = useState(false)

  const lang = useLangStore((state) => state.lang)

  const { data: shorformGrid, isLoading } = useQuery({
    queryKey: ['short-form-grid-detail', params.postId],
    queryFn: async () => {
      const res = await privateAPI.get('/shortForm/' + params.postId)
      return res.data.result
    },
  })

  if (isLoading) {
    return (
      <div className="flex w-full grow items-center justify-center py-10">
        <LoaderIcon />
      </div>
    )
  }
  return (
    <div className="relative w-full grow overflow-hidden py-4">
      {/* 검정 화면 wrapper */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute bottom-0 z-30 h-full w-full bg-black bg-opacity-70"
        />
      )}
      <Image
        src={shorformGrid.image}
        alt="new jeans"
        layout="fill"
        className="h-full w-full object-contain"
      />

      <div className="absolute bottom-0 z-50 flex w-full items-end justify-between">
        {/* text */}
        <button
          onClick={() => {
            scrollPos.current?.scrollTo(0, 0)
            setIsCollapsed(!isCollapsed)
          }}
          className={`${isCollapsed ? 'h-[20dvh]' : 'h-[6dvh]'} flex flex-1 flex-col gap-y-2 px-4 transition-all duration-300 ease-in-out`}
        >
          {/* <p className="text-xs-bold">타이틀</p> */}
          <div
            className={`${isCollapsed ? 'overflow-y-scroll' : 'line-clamp-2 overflow-y-hidden'} w-full whitespace-pre-line text-start text-2xs`}
            // 스크롤 탑으로
            ref={scrollPos}
          >
            {shorformGrid.content}
          </div>
        </button>
        {/* icons */}
        <div className="flex flex-col gap-y-5 px-4 py-5">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            {liked ? (
              <LikeOnSVG className="h-6 w-6" />
            ) : (
              <LikeOffSVG className="h-6 w-6" />
            )}
            <span className="text-2xs">
              {ISSUE_CONSTANTS[lang]['detail-like-text']}
            </span>
          </button>

          <button
            onClick={() => setUnliked(!unliked)}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            {unliked ? (
              <UnLikeOnSVG className="h-6 w-6" />
            ) : (
              <UnLikeOffSVG className="h-6 w-6" />
            )}
            <span className="text-2xs">
              {ISSUE_CONSTANTS[lang]['detail-unlike-text']}
            </span>
          </button>

          <button
            onClick={() => setScraped(!scraped)}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <div className="flex h-6 w-6 items-center justify-center">
              {scraped ? <ScrapOnSVG /> : <ScrapOffSVG />}
            </div>
            <span className="text-2xs">
              {ISSUE_CONSTANTS[lang]['detail-scrap-text']}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IssueDetail
