'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
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

function IssueDetail({ params }: { params: { postId: string } }) {
  const [scraped, setScraped] = useState(false)

  const [action, setAction] = useState<number>(0) //1: like, 2: unlike 0: none
  const scrollPos = useRef<HTMLDivElement>(null)
  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const [isCollapsed, setIsCollapsed] = useState(false)

  const lang = useLangStore((state) => state.lang)
  const santinizer = DOMPurify.sanitize
  const { data: shorformGrid, isLoading } = useQuery({
    queryKey: ['short-form-grid-detail', params.postId],
    queryFn: async () => {
      const res = await privateAPI.get('/shortForm/' + params.postId)

      // if (res.status === 200) {
      //   //오디오 플레이
      //   const tempAudio = new Audio(res.data.result.audio)
      //   setAudio(tempAudio)
      // }

      return res.data.result
    },
  })

  // useEffect(() => {
  //   if (audio) {
  //     audio.play()
  //   }
  // }, [audio])

  const queryClient = useQueryClient()
  const { mutate: mutateScrap } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.post('/shortForm/is_saved', {
        shortFormId: params.postId,
        isSaved: !scraped,
      })
      return res.data.result
    },
    onSuccess: () => {
      setScraped(!scraped)
      queryClient.invalidateQueries({
        queryKey: ['short-form-grid-detail', params.postId],
      })
    },
  })

  const handleScrap = () => {
    mutateScrap()
  }

  const { mutate: mutateLike } = useMutation({
    mutationFn: async ({ num }: { num: number }) => {
      const res = await privateAPI.post('/shortForm/preference', {
        shortFormId: Number(params.postId),
        preference: num,
      })
      return res.data.result
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['short-form-grid-detail', params.postId],
      })
    },
  })

  const handleLike = () => {
    if (action === 1) {
      setAction(0)
      mutateLike({ num: 0 })
    } else {
      setAction(1)
      mutateLike({ num: 1 })
    }
  }

  const handleUnLike = () => {
    if (action === 2) {
      setAction(0)
      mutateLike({ num: 0 })
    } else {
      setAction(2)
      mutateLike({ num: 2 })
    }
  }
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
            onClick={handleLike}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            {action === 1 ? (
              <LikeOnSVG className="h-6 w-6" />
            ) : (
              <LikeOffSVG className="h-6 w-6" />
            )}
            <span className="text-2xs">
              {ISSUE_CONSTANTS[lang]['detail-like-text']}
            </span>
          </button>

          <button
            onClick={handleUnLike}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            {action === 2 ? (
              <UnLikeOnSVG className="h-6 w-6" />
            ) : (
              <UnLikeOffSVG className="h-6 w-6" />
            )}
            <span className="text-2xs">
              {ISSUE_CONSTANTS[lang]['detail-unlike-text']}
            </span>
          </button>

          <button
            onClick={handleScrap}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <div className="flex h-6 w-6 items-center justify-center">
              {scraped ? <ScrapOnSVG /> : <ScrapOffSVG />}
            </div>
            <span
              className="text-2xs"
              dangerouslySetInnerHTML={{
                __html: santinizer(ISSUE_CONSTANTS[lang]['detail-scrap-text']),
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default IssueDetail
