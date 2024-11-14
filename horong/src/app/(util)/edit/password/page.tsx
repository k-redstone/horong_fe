'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EDIT_PASSWORD_CONSTANT } from '@/constants/edit/password/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import SuccessIcon from '@/static/svg/auth/auth-checked-term-icon.svg'
import InvisibleIcon from '@/static/svg/auth/auth-invisible-icon.svg'
import VisibleIcon from '@/static/svg/auth/auth-visible-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
function EditPassword() {
  const [isPwAllowed, setIsPwAllowed] = useState<boolean>(false) // 비밀번호 조건에 맞는지 확인

  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false) // 비밀번호 확인란과 일치하는지 확인
  const [confirmPw, setConfirmPw] = useState<string>('')

  const [errTxt, setErrTxt] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  // password visible
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPwVisible, setConfirmPwVisible] = useState<boolean>(false)

  const lang = useLangStore((state) => state.lang)

  const router = useRouter()
  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.patch('/user/password', {
        currentPassword: currentPw,
        newPassword: password,
      })

      return res.data.result
    },
    onSuccess: () => {
      toast.success(EDIT_PASSWORD_CONSTANT[lang]['password-toast'])
      router.back()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      //status에 따라 에러 메시지 변경
      setErrTxt(err.response.data.message)
    },
  })

  const changePassword = () => {
    changePasswordMutation()
  }
  useEffect(() => {
    if (
      !password.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      )
    ) {
      setIsError(true)
      setIsPwAllowed(false)
      setConfirmPw('')
      setErrTxt(EDIT_PASSWORD_CONSTANT[lang]['password-error1'])
      return
    }

    setIsPwAllowed(true)

    if (password === confirmPw) {
      setPasswordCheck(true)
      setIsError(false)
    } else {
      setPasswordCheck(false)
      setIsError(true)
      setErrTxt(EDIT_PASSWORD_CONSTANT[lang]['password-error2'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPw])

  const clickedXmark = () => {
    setPassword('')
    setIsPwAllowed(false)
    setIsError(false)
  }

  const [currentPw, setCurrentPw] = useState<string>('')
  const [currentPwVisible, setCurrentPwVisible] = useState<boolean>(false)
  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader
        pageName={EDIT_PASSWORD_CONSTANT[lang]['password-header']}
      />

      <div className="flex flex-col items-center justify-between overflow-y-scroll px-6">
        <div className="flex w-full flex-col gap-y-1 py-10">
          <h3 className="text-lg">
            {EDIT_PASSWORD_CONSTANT[lang]['password-title']}
          </h3>
          <span className="text-sm">
            {EDIT_PASSWORD_CONSTANT[lang]['password-sub-title']}
          </span>
        </div>

        <div className="mb-10 mt-5 flex w-full flex-col gap-y-4 py-3">
          <label
            className="text-high text-xs-bold"
            htmlFor="pw-current"
          >
            CURRENT PASSWORD
          </label>
          <div className="relative flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
            <input
              id="pw-current"
              type={currentPwVisible ? 'text' : 'password'}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
              placeholder={
                EDIT_PASSWORD_CONSTANT[lang]['password-current-placeholder']
              }
            />
            <div className="absolute right-0 mr-4 flex items-center gap-x-2">
              {currentPw && (
                <>
                  <button
                    className="w-6 focus-visible:outline-primary"
                    onClick={() => setCurrentPwVisible(!currentPwVisible)}
                  >
                    {currentPwVisible ? <VisibleIcon /> : <InvisibleIcon />}
                  </button>
                  <button
                    className="focus-visible:outline-primary"
                    onClick={() => setCurrentPw('')}
                  >
                    <XmarkIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* 비밀번호 입력 컨테이너   */}
        <div className="mb-40 flex w-full flex-col justify-center gap-y-4 py-3">
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
              placeholder={
                EDIT_PASSWORD_CONSTANT[lang]['password-new-placeholder']
              }
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
                    EDIT_PASSWORD_CONSTANT[lang]['password-confirm-placeholder']
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
                <p
                  className={`${password.match(/^.{8,20}$/) && 'text-primary'}`}
                >
                  {EDIT_PASSWORD_CONSTANT[lang]['password-inform1']}
                </p>
                <p
                  className={`${password.match(/^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d).+$/) && 'text-primary'}`}
                >
                  {EDIT_PASSWORD_CONSTANT[lang]['password-inform2']}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={changePassword}
          disabled={!isPwAllowed || password !== confirmPw}
          className={`${(!isPwAllowed || password !== confirmPw) && '!bg-grey-50 text-text-disabled'} flex w-full items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
        >
          {EDIT_PASSWORD_CONSTANT[lang]['password-btn']}
        </button>
      </div>
    </div>
  )
}

export default EditPassword
