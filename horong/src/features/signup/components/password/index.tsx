import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
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

  const lang = useLangStore((state) => state.lang)
  useEffect(() => {
    if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      )
    ) {
      setIsError(true)
      setIsPwAllowed(false)
      setConfirmPw('')
      setErrTxt(AUTH_CONSTANT[lang]['signup-pw-error1'])
      return
    }

    setIsPwAllowed(true)

    if (password === confirmPw) {
      setPasswordCheck(true)
      setIsError(false)
    } else {
      setPasswordCheck(false)
      setIsError(true)
      setErrTxt(AUTH_CONSTANT[lang]['signup-pw-error2'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPw])

  const clickedXmark = () => {
    setPassword('')
    setIsPwAllowed(false)
    setIsError(false)
  }
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[10rem]" />
        <Image
          src={Progress4}
          alt="signup_progress4"
          className="w-[10.3125rem]"
        />
      </div>

      <div className="mb-10 w-full text-lg">
        {AUTH_CONSTANT[lang]['signup-pw-txt1']}
      </div>

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
            placeholder={AUTH_CONSTANT[lang]['pw-placeholder']}
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
                placeholder={
                  AUTH_CONSTANT[lang]['signup-pwconfirm-placeholder']
                }
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
                      onClick={() => setConfirmPw('')}
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
                {AUTH_CONSTANT[lang]['signup-pw-inform1']}
              </p>
              <p
                className={`${password.match(/^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d).+$/) && 'text-primary'}`}
              >
                {AUTH_CONSTANT[lang]['signup-pw-inform2']}
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
        {AUTH_CONSTANT[lang]['signup-lang-btn']}
      </button>
    </div>
  )
}

export default SignupPassword
