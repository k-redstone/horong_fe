'use client'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

import BgIcon from '@/static/imgs/global-bg-bottom.png'
import ChatIcon from '@/static/svg/global/global-chat-icon.svg'
import UtilIcon from '@/static/svg/global/global-util-icon.svg'
import LogoIcon from '@/static/svg/logo-icon.svg'

function GlobalFooterNav() {
  const showUtilityModal = () => {
    toast.error('준비중인 서비스입니다.')
  }
  return (
    <div className="relative bottom-0 mt-4 flex max-h-[5rem] w-full items-center justify-between">
      <Image
        src={BgIcon}
        alt="bottom-nav-bg"
        className="absolute bottom-0 h-[5rem] w-full"
      />
      <Link
        href={'/home'}
        className="z-10 flex flex-1 items-center justify-center"
      >
        <ChatIcon className="h-11 w-11 rounded-full p-1" />
      </Link>
      <Link
        href={'/shot'}
        className="z-10 flex flex-1 items-center justify-center pb-8"
      >
        <LogoIcon className="h-[3.125rem] w-[3.125rem]" />
      </Link>
      <button
        onClick={showUtilityModal}
        className="z-10 flex flex-1 items-center justify-center"
      >
        <UtilIcon className="h-11 w-11" />
      </button>
    </div>
  )
}

export default GlobalFooterNav
