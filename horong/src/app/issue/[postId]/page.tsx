'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

import { ISSUE_CONSTANTS } from '@/constants/issue/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ARKImg from '@/static/imgs/DUMMY_ARK.jpg'
import LoLImg from '@/static/imgs/DUMMY_LOL.jpg'
import NewJeansImg from '@/static/imgs/DUMMY_NJS.jpg'
import LikeOffSVG from '@/static/svg/issue/issue-post-like-off-icon.svg'
import LikeOnSVG from '@/static/svg/issue/issue-post-like-on-icon.svg'
import ScrapOffSVG from '@/static/svg/issue/issue-post-scrap-off-icon.svg'
import ScrapOnSVG from '@/static/svg/issue/issue-post-scrap-on-icon.svg'
import UnLikeOffSVG from '@/static/svg/issue/issue-post-unlike-off-icon.svg'
import UnLikeOnSVG from '@/static/svg/issue/issue-post-unlike-on-icon.svg'

function IssueDetail() {
  const [liked, setLiked] = useState(false)
  const [unliked, setUnliked] = useState(false)
  const [scraped, setScraped] = useState(false)
  const scrollPos = useRef<HTMLDivElement>(null)

  const [isCollapsed, setIsCollapsed] = useState(false)
  //1~3까지 랜덤으로 뽑기
  const [random] = useState(Math.floor(Math.random() * 3) + 1)

  const lang = useLangStore((state) => state.lang)
  return (
    <div className="relative w-full grow overflow-hidden py-4">
      {/* 검정 화면 wrapper */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute bottom-0 z-30 h-full w-full bg-black bg-opacity-30"
        />
      )}
      <Image
        src={random === 1 ? NewJeansImg : random === 2 ? ARKImg : LoLImg}
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
          <p className="text-xs-bold">타이틀</p>
          <div
            className={`${isCollapsed ? 'overflow-y-scroll' : 'line-clamp-2 overflow-y-hidden'} w-full text-start text-2xs`}
            // 스크롤 탑으로
            ref={scrollPos}
          >
            텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?텍스튼데요이게너무길어서마링죠?
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
            {scraped ? (
              <ScrapOnSVG className="h-6 w-6" />
            ) : (
              <ScrapOffSVG className="h-6 w-6" />
            )}
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
