'use client'
import Link from 'next/link'

import { MAIN_CONSTANT } from '@/constants/main/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTextIcon from '@/static/svg/logo-text-icon.svg'

export default function Home() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex w-full flex-col items-center justify-center bg-grey-90 text-3xl font-bold">
      <div className="mb-[6.25rem] flex w-full flex-col items-center justify-center gap-y-10">
        <LogoIcon className="h-32 w-32" />

        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          {/* 박상우 고쳐 - 번역을 고치세요 */}
          <p className="flex w-full items-center justify-center">
            {MAIN_CONSTANT[lang]['logo-txt']}
          </p>
          <div className="w-[10.1875rem]">
            <LogoTextIcon />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-4 px-3 py-6">
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-full bg-[#acbeff] px-6 py-3 text-sm text-grey-100"
        >
          {' '}
          {MAIN_CONSTANT[lang]['login-btn']}
        </Link>

        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-full bg-grey-60 px-6 py-3 text-sm text-text-high"
        >
          {MAIN_CONSTANT[lang]['signup-btn']}
        </Link>
      </div>
    </div>
  )
}
