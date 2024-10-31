import Link from 'next/link'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

function SignupComplete() {
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="회원가입" />

      <div className="flex w-full grow flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-10 pb-32">
          <LogoIcon className="h-32 w-32" />
          <div className="flex flex-col items-center justify-center gap-y-3">
            <LogoTxtIcon className="w-[8.25rem]" />
            <p className="text-lg">가입을 환영합니다!</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-5 py-6">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm text-grey-100"
          >
            호롱 시작하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupComplete
