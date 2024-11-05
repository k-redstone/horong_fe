'use client'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import publicAPI from '@/api/publicAPI/index.ts'
import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import InvisibleIcon from '@/static/svg/auth/auth-invisible-icon.svg'
import VisibleIcon from '@/static/svg/auth/auth-visible-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
import CheckedIcon from '@/static/svg/checked-icon.svg'
import LogoIcon from '@/static/svg/logo-icon.svg'
import LogoTextIcon from '@/static/svg/logo-text-icon.svg'
import UncheckedIcon from '@/static/svg/unchecked-icon.svg'

function Login() {
  const router = useRouter()

  const lang = useLangStore((state) => state.lang)

  const [isChecked, setIsChecked] = useState<boolean>(false)

  const [isError, setIsError] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const [userId, setUserId] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [isUserPasswordVisible, setIsUserPasswordVisible] =
    useState<boolean>(false)

  const { mutate: submitLoginMutation } = useMutation({
    mutationFn: async () => {
      const response = await publicAPI.post('/auth/login', {
        userId,
        password: userPassword,
      })

      if (response.status === 200) {
        //토큰 저장
        sessionStorage.setItem('token', response.data.result.accessToken)
        if (isChecked) {
          localStorage.setItem('token', response.data.result.accessToken)
        }
      }

      return response
    },

    onSuccess: () => {
      toast.success(AUTH_CONSTANT[lang]['success-toast'])
      router.push('/home')
    },

    onError: (error) => {
      setUserId('')
      setUserPassword('')

      setIsError(true)
      setErrorMessage(error.message)
    },
  })

  const submitLogin = () => {
    submitLoginMutation()
  }

  const checkSaveLoginInfo = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="flex w-full flex-col items-start justify-center overflow-y-scroll">
      <div className="flex w-full flex-col items-center justify-center gap-y-5 pb-20">
        <LogoIcon className="h-20 w-20" />
        <LogoTextIcon className="w-[9.5rem]" />
      </div>

      {/* 로그인 인풋 컨테이너 */}
      <div className="flex w-full flex-col items-center justify-center gap-y-4 px-5 py-3">
        <div className="flex w-full flex-col items-start justify-center gap-y-2">
          <label className="text-high text-xs-bold">
            {AUTH_CONSTANT[lang]['id-label']}
          </label>
          <div className="flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1 bg-inherit outline-none placeholder:text-text-md"
              placeholder={AUTH_CONSTANT[lang]['id-placeholder']}
            />

            {userId && (
              <button
                className="focus-visible:outline-primary"
                onClick={() => setUserId('')}
              >
                <XmarkIcon />
              </button>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-y-2">
          <label className="text-high text-xs-bold">
            {AUTH_CONSTANT[lang]['pw-label']}
          </label>
          <div className="flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
            <input
              type={isUserPasswordVisible ? 'text' : 'password'}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="flex-1 bg-inherit outline-none placeholder:text-text-md"
              placeholder={AUTH_CONSTANT[lang]['pw-placeholder']}
            />

            {userPassword && (
              <div className="flex items-center justify-center gap-x-2">
                <button
                  className="focus-visible:outline-primary"
                  onClick={() =>
                    setIsUserPasswordVisible(!isUserPasswordVisible)
                  }
                >
                  {isUserPasswordVisible ? <VisibleIcon /> : <InvisibleIcon />}
                </button>
                <button
                  className="focus-visible:outline-primary"
                  onClick={() => setUserPassword('')}
                >
                  <XmarkIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 에러텍스트 */}
      {isError && (
        <p className="w-full px-5 text-start text-xs text-warning">
          {errorMessage}
        </p>
      )}
      {/* 로그인정보 저장버튼 */}
      <div className="flex w-full items-center justify-end px-5 pb-11">
        {isChecked ? (
          <button
            className="flex items-center justify-center gap-x-1 focus-visible:outline-primary"
            onClick={checkSaveLoginInfo}
          >
            <div className="flex aspect-square w-6 items-center justify-center">
              <CheckedIcon />
            </div>
            <span className="text-xs">
              {AUTH_CONSTANT[lang]['login-inform-check']}
            </span>
          </button>
        ) : (
          <button
            className="flex items-center justify-center gap-x-1 focus-visible:outline-primary"
            onClick={checkSaveLoginInfo}
          >
            <div className="flex aspect-square w-6 items-center justify-center">
              <UncheckedIcon />
            </div>
            <span className="text-xs">
              {AUTH_CONSTANT[lang]['login-inform-check']}
            </span>
          </button>
        )}
      </div>

      {/* 로그인 및 회원가입 버튼 */}
      <div className="flex w-full flex-col gap-y-5 px-5 py-6">
        <button
          onClick={submitLogin}
          disabled={!userId || !userPassword}
          className={`flex w-full items-center justify-center rounded-xl py-3 text-md ${userId && userPassword ? 'bg-primary text-grey-100' : 'bg-grey-50 text-text-disabled focus-visible:outline-primary'}`}
        >
          {AUTH_CONSTANT[lang]['login-btn']}
        </button>

        <Link
          href="/signup"
          className="flex items-center justify-center text-xs text-text-high hover:underline focus-visible:outline-primary"
        >
          {AUTH_CONSTANT[lang]['signup-btn']}
        </Link>
      </div>
    </div>
  )
}

export default Login
