import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import useSignupStore from '@/hooks/useSignupStore.ts'
import Progress4 from '@/static/imgs/signup-progress4-icon.png'
import SuccessIcon from '@/static/svg/auth/auth-checked-term-icon.svg'
import InvisibleIcon from '@/static/svg/auth/auth-invisible-icon.svg'
import VisibleIcon from '@/static/svg/auth/auth-visible-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'
interface SignupProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
function SignupPassword({ setStep }: SignupProps) {
  const [isPwAllowed, setIsPwAllowed] = useState<boolean>(false) // 비밀번호 조건에 맞는지 확인
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false) // 비밀번호 확인란과 일치하는지 확인

  const setPassword = useSignupStore((state) => state.setPassword)
  const password = useSignupStore((state) => state.password)
  const [confirmPw, setConfirmPw] = useState<string>('')

  const [errTxt, setErrTxt] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  // password visible
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPwVisible, setConfirmPwVisible] = useState<boolean>(false)

  useEffect(() => {
    if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      )
    ) {
      setIsError(true)
      setIsPwAllowed(false)
      setConfirmPw('')
      setErrTxt('· 비밀번호 조건을 확인해주세요.')
      return
    }

    setIsPwAllowed(true)

    if (password === confirmPw) {
      setPasswordCheck(true)
      setIsError(false)
    } else {
      setPasswordCheck(false)
      setIsError(true)
      setErrTxt('· 비밀번호가 일치하지 않습니다.')
    }
  }, [password, confirmPw])

  const clickedXmark = () => {
    setPassword('')
    setIsPwAllowed(false)
    setIsError(false)
  }
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[8.25rem]" />
        <Image
          src={Progress4}
          alt="signup_progress4"
          className="w-[10.3125rem]"
        />
      </div>

      <div className="mb-10 w-full text-lg">비밀번호를 설정해주세요.</div>

      {/* 비밀번호 입력 컨테이너   */}
      <div className="mb-40 flex flex-col justify-center gap-y-4 py-3">
        {/* 비밀번호 */}
        <label
          className="text-high text-xs-bold"
          htmlFor="pw"
        >
          PASSWORD
        </label>
        <div className="relative flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
          <input
            id="pw"
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
            placeholder={'비밀번호를 입력해주세요'}
          />
          <div className="absolute right-0 mr-4 flex items-center gap-x-2">
            {isPwAllowed && <SuccessIcon />}

            {password && (
              <>
                <button
                  className="w-6 focus-visible:outline-primary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <VisibleIcon /> : <InvisibleIcon />}
                </button>
                <button
                  className="focus-visible:outline-primary"
                  onClick={clickedXmark}
                >
                  <XmarkIcon />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        {isPwAllowed && (
          <>
            <label
              className="text-high text-xs-bold"
              htmlFor="confirm-pw"
            >
              CONFIRM PASSWORD
            </label>
            <div className="relative flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
              <input
                id="confirm-pw"
                type={confirmPwVisible ? 'text' : 'password'}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
                placeholder={'비밀번호를 다시 입력해주세요'}
              />
              <div className="absolute right-0 mr-4 flex items-center gap-x-2">
                {isPwAllowed && passwordCheck && <SuccessIcon />}
                {confirmPw && (
                  <>
                    <button
                      className="w-6 focus-visible:outline-primary"
                      onClick={() => setConfirmPwVisible(!confirmPwVisible)}
                    >
                      {confirmPwVisible ? <VisibleIcon /> : <InvisibleIcon />}
                    </button>
                    <button
                      className="focus-visible:outline-primary"
                      onClick={clickedXmark}
                    >
                      <XmarkIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div className="px-1 text-2xs">
          {isError && <p className="text-warning">{errTxt}</p>}
          {!isPwAllowed && (
            <div className="text-text-md">
              <p className={`${password.match(/^.{8,20}$/) && 'text-primary'}`}>
                · 8자 이상 20자 이하여야합니다.
              </p>
              <p
                className={`${password.match(/^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d).+$/) && 'text-primary'}`}
              >
                · 비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setStep(4)}
        disabled={!isPwAllowed || password !== confirmPw}
        className={`${(!isPwAllowed || password !== confirmPw) && '!bg-grey-50 text-text-disabled'} flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
      >
        다음으로
      </button>
    </div>
  )
}

export default SignupPassword
