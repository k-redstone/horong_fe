'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { MYPAGE_CONSTANT } from '@/constants/mypage/index.ts'
import CommunityAlarmToggle from '@/features/mypage/components/toggle/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import ArrowRightIcon from '@/static/svg/mypage/mypage-arrowright-icon.svg'
import ProfileEditIcon from '@/static/svg/mypage/mypage-profile-edit-icon.svg'

type UserDataType = {
  nickname: string
  profilePreSignedUrl: string
}

function MyPage() {
  const [isToggle, setIsToggle] = useState(false)
  const lang = useLangStore((state) => state.lang)

  const { data: user } = useQuery<UserDataType>({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')
      return res.data.result
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleCommunityAlarm = () => {}
  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-6 bg-grey-80">
      <GlobalHeader pageName={MYPAGE_CONSTANT[lang]['mypage-header']} />
      {/* 메인 콘텐츠 wrapper */}

      <div className="flex grow flex-col gap-y-3 overflow-y-scroll">
        {/* 프로필 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-4 pb-2 pt-7">
          {/* 프로필 사진 */}
          <Link
            href="/edit/profile"
            className="relative"
          >
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
            <div className="absolute bottom-0 right-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2">
              <ProfileEditIcon />
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center gap-y-1">
            <p className="text-sm text-text-high">{user && user?.nickname}</p>
            <Link
              href="/edit/nickname"
              className="flex items-center justify-center text-xs text-text-md"
            >
              {MYPAGE_CONSTANT[lang]['mypage-nickname-edit']}
            </Link>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="flex w-full flex-col items-center justify-center px-6">
          <Link
            className="flex w-full items-center justify-between border-y border-[rgba(255,255,255,0.1)] px-2 py-5"
            href="/edit/lang"
          >
            <span>{MYPAGE_CONSTANT[lang]['mypage-lang-txt']}</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>

          <button
            className="flex w-full items-center justify-between border-y border-transparent px-2 py-5"
            onClick={() => setIsToggle(!isToggle)}
          >
            <span>{MYPAGE_CONSTANT[lang]['mypage-alarm-txt']}</span>
            <CommunityAlarmToggle isToggle={isToggle} />
          </button>

          <Link
            className="flex w-full items-center justify-between border-y border-[rgba(255,255,255,0.1)] px-2 py-5"
            href="/edit/password"
          >
            <span>{MYPAGE_CONSTANT[lang]['mypage-pw-txt']}</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <Link
        href="/delete"
        className="flex w-full grow items-center justify-start px-6 text-xs text-warning"
      >
        {MYPAGE_CONSTANT[lang]['mypage-delete-txt']}
      </Link>
    </div>
  )
}

export default MyPage
