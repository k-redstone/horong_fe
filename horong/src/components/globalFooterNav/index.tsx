'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { HOME_CONSTANT } from '@/constants/home/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import BgIcon from '@/static/imgs/global-bg-bottom.png'
import ChatIcon from '@/static/svg/global/global-chat-icon.svg'
import UtilIcon from '@/static/svg/global/global-util-icon.svg'
import LogoIcon from '@/static/svg/logo-icon.svg'
import CommunityIcon from '@/static/svg/sidebar/sidebar-community-icon.svg'
import ExchangeIcon from '@/static/svg/sidebar/sidebar-exchange-icon.svg'
import GuideIcon from '@/static/svg/sidebar/sidebar-guide-icon.svg'
import MicIcon from '@/static/svg/sidebar/sidebar-mic-icon.svg'

function GlobalFooterNav() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      document.body.classList.add('ios')
      setIsIOS(true)
    }
  }, [])

  const lang = useLangStore((state) => state.lang)

  return (
    <div className="relative mt-4 flex max-h-[4.25rem] w-full items-center justify-between px-12 py-4">
      <Image
        src={BgIcon}
        alt="bottom-nav-bg"
        className="absolute bottom-0 left-0 h-[4.25rem] w-full"
      />

      {/* 이슈 왼쪽 */}
      <Link
        href={'/issue'}
        className="z-10 flex items-center justify-center"
      >
        <ChatIcon className="h-12 w-12 p-1" />
      </Link>

      {/* 로고 중앙 */}
      <Link
        href={'/home'}
        className="z-10 flex items-center justify-center pb-8"
      >
        <LogoIcon className="h-[3.125rem] w-[3.125rem]" />
      </Link>

      {/* 유틸 오른쪽 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="z-10 flex items-center justify-center"
      >
        <UtilIcon className="h-12 w-12 p-1" />
      </button>

      {/* 모달 */}
      {isIOS ? (
        <div
          className={`${isModalOpen ? 'block' : 'hidden'} absolute bottom-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-y-6 rounded-md rounded-t-[2.5rem] bg-grey-80 px-6 pb-8 pt-6`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-[.3125rem] w-12 rounded-3xl bg-grey-40"
          />
          {/* link */}
          <div className="flex w-full flex-col gap-y-2">
            <Link
              href="/guide"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <GuideIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['guide-btn']}</span>
            </Link>

            <Link
              href="/learn"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <MicIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['mic-btn']}</span>
            </Link>

            <Link
              href="/community"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <CommunityIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['community-btn']}</span>
            </Link>

            <Link
              href="/exchange"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <ExchangeIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['exchange-btn']}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`${isModalOpen ? 'bottom-0' : 'bottom-[-100dvh]'} absolute left-0 z-50 flex w-full flex-col items-center justify-center gap-y-6 rounded-md rounded-t-[2.5rem] bg-grey-80 px-6 pb-8 pt-6 transition-all duration-500 ease-in-out`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-[.3125rem] w-12 rounded-3xl bg-grey-40"
          />
          {/* link */}
          <div className="flex w-full flex-col gap-y-2">
            <Link
              href="/guide"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <GuideIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['guide-btn']}</span>
            </Link>

            <Link
              href="/learn"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <MicIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['mic-btn']}</span>
            </Link>

            <Link
              href="/community"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <CommunityIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['community-btn']}</span>
            </Link>

            <Link
              href="/exchange"
              className="flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high"
            >
              <ExchangeIcon className="h-5 w-5" />
              <span>{HOME_CONSTANT[lang]['exchange-btn']}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalFooterNav
