import Link from 'next/link'

import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTextIcon from '@/static/svg/logo-text-icon.svg'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-3xl font-bold">
      <div className="mb-[6.25rem] flex flex-col items-center justify-center gap-y-10 px-[6.25rem]">
        <LogoIcon className="h-32 w-32" />
        <LogoTextIcon className="w-[10.2rem]" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-4 px-3 py-6">
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-full bg-[#acbeff] px-6 py-3 text-sm text-grey-100"
        >
          로그인
        </Link>

        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-full bg-grey-60 px-6 py-3 text-sm text-text-high"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
}
