'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import LinkWrapperBtn from '@/components/sidebar/linkwrapper/index.tsx'
import { MYPAGE_CONSTANT } from '@/constants/mypage/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ArrowDownIcon from '@/static/svg/sidebar/sidebar-arrowdown-icon.svg'
import ArrowUpIcon from '@/static/svg/sidebar/sidebar-arrowup-icon.svg'
import CloseIcon from '@/static/svg/sidebar/sidebar-close-icon.svg'
import CommunityIcon from '@/static/svg/sidebar/sidebar-community-icon.svg'
import ExchangeIcon from '@/static/svg/sidebar/sidebar-exchange-icon.svg'
import GuideIcon from '@/static/svg/sidebar/sidebar-guide-icon.svg'
import HomeIcon from '@/static/svg/sidebar/sidebar-home-icon.svg'
import IssueIcon from '@/static/svg/sidebar/sidebar-issue-icon.svg'
import MicIcon from '@/static/svg/sidebar/sidebar-mic-icon.svg'

type UserDataType = {
  nickname: string
  profilePreSignedUrl: string
}

function SideBar() {
  const [isCollapse, setIsCollapse] = useState<boolean>(false)
  const router = useRouter()

  const lang = useLangStore((state) => state.lang)

  const { data: user, isLoading } = useQuery<UserDataType>({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')
      return res.data.result
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.post('/auth/logout')

      if (res.status === 200) {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        router.push('/')
      }
    },
  })

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderIcon />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-3 bg-grey-80">
      <div className="flex w-full items-center justify-end px-3 py-2">
        <button onClick={() => router.back()}>
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      {/* 메인 콘텐츠 wrapper */}

      <div className="flex grow flex-col gap-y-3">
        {/* 프로필 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-4 py-5">
          {/* 프로필 사진 */}
          {user && (
            // <div className="relative px-36">
            <Image
              src={user.profilePreSignedUrl}
              alt="profile"
              width={80}
              height={80}
              // layout="responsive"
              className="rounded-full"
              priority
            />
          )}

          {/* 이름 */}
          <p className="text-sm text-text-high">{user && user?.nickname}</p>
          <Link
            href="/mypage"
            className="flex w-fit items-center justify-center rounded-xl bg-primary px-24 py-3 text-xs text-grey-100"
          >
            {MYPAGE_CONSTANT[lang]['sidebar-mypage-btn']}
          </Link>
        </div>

        {/* 메뉴 */}
        <div className="flex w-full flex-col justify-center gap-y-3 overflow-y-scroll px-6 py-3">
          {/* 홈 collapse*/}
          <div className="flex flex-col text-text-high">
            <div className="flex w-full items-center gap-x-3 bg-inherit px-3 py-2">
              <HomeIcon className="h-5 w-5" />
              <span>{MYPAGE_CONSTANT[lang]['sidebar-home-txt']}</span>

              <div className="flex flex-1 items-center justify-end">
                <button onClick={() => setIsCollapse(!isCollapse)}>
                  {isCollapse ? (
                    <ArrowUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            <div
              className={`${
                isCollapse ? 'h-full' : 'hidden'
              } flex flex-col items-start justify-center gap-y-3 px-11 py-3 transition-all duration-200 ease-in-out`}
            >
              <Link
                href="/home"
                className="py-2"
              >
                {MYPAGE_CONSTANT[lang]['sidebar-home-txt']}
              </Link>
              <Link
                href="/home/last"
                className="py-2"
              >
                {MYPAGE_CONSTANT[lang]['sidebar-last-txt']}
              </Link>
            </div>
          </div>

          <LinkWrapperBtn href="/learn">
            <MicIcon className="h-5 w-5" />
            <span>{MYPAGE_CONSTANT[lang]['sidebar-mic-txt']}</span>
          </LinkWrapperBtn>

          <LinkWrapperBtn href="/issue">
            <IssueIcon className="h-5 w-5" />
            <span>{MYPAGE_CONSTANT[lang]['sidebar-issue-txt']}</span>
          </LinkWrapperBtn>

          <LinkWrapperBtn href="/community">
            <CommunityIcon className="h-5 w-5" />
            <span>{MYPAGE_CONSTANT[lang]['sidebar-community-txt']}</span>
          </LinkWrapperBtn>

          <LinkWrapperBtn href="/exchange">
            <ExchangeIcon className="h-5 w-5" />
            <span>{MYPAGE_CONSTANT[lang]['sidebar-exchange-txt']}</span>
          </LinkWrapperBtn>

          <LinkWrapperBtn href="/guide">
            <GuideIcon className="h-5 w-5" />
            <span>{MYPAGE_CONSTANT[lang]['sidebar-guide-txt']}</span>
          </LinkWrapperBtn>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex w-full grow items-center justify-start px-6 text-xs text-warning"
      >
        {MYPAGE_CONSTANT[lang]['sidebar-logout-txt']}
      </button>
    </div>
  )
}

export default SideBar
