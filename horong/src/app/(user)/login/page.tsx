'use client'
import Link from 'next/link'
import toast from 'react-hot-toast'

import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTextIcon from '@/static/svg/logo-text-icon.svg'

function Login() {
  const submitLogin = () => {
    toast.success('로그인 성공')
  }

  const moveSignup = () => {
    console.log(window.navigator.userAgent)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-5 pb-20">
        <LogoIcon className="h-20 w-20" />
        <LogoTextIcon className="w-[9.5rem]" />
      </div>

      {/* 로그인 인풋 컨테이너 */}
      <div className="flex w-full flex-col items-center justify-center gap-y-2 px-5 py-3">
        <div className="flex w-full flex-col items-start justify-center">
          <label className="text-high text-xs-bold">ID</label>
          <input
            type="text"
            placeholder={'아이디를 입력해주세요'}
          />
        </div>

        <div className="flex flex-col items-start justify-center">
          <label>Password</label>
          <input type="password" />
        </div>
      </div>

      {/* 에러텍스트 */}
      <p>에러텍스트</p>
      {/* 로그인정보 저장버튼 */}
      <div className="flex items-end justify-center pb-11">
        <input type="checkbox" />
        <span>로그인 정보 저장</span>
      </div>

      {/* 로그인 및 회원가입 버튼 */}
      <div className="flex flex-col gap-y-5 px-5 py-6">
        <button
          onClick={moveSignup}
          className="flex w-full items-center justify-center rounded-xl bg-grey-50 py-3 text-md"
        >
          로그인
        </button>

        <Link
          href="/signup"
          className="flex items-center justify-center text-xs text-text-high hover:underline"
        >
          아직 회원이 아니시라면? 회원가입
        </Link>
      </div>
    </div>
  )
}

export default Login
