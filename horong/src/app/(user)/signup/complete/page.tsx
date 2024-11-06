'use client'
import Link from 'next/link'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

function SignupComplete() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName={AUTH_CONSTANT[lang]['complete-header']} />

      <div className="flex w-full grow flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-10 pb-32">
          <LogoIcon className="h-32 w-32" />
          <div className="flex flex-col items-center justify-center gap-y-3">
            <LogoTxtIcon className="w-[8.25rem]" />
            <p className="text-lg">{AUTH_CONSTANT[lang]['complete-txt1']}</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-5 py-6">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm text-grey-100"
          >
            {AUTH_CONSTANT[lang]['complete-btn']}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupComplete
