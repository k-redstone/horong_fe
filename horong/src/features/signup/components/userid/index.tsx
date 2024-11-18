import { useEffect, useState } from 'react'

import publicAPI from '@/api/publicAPI/index.ts'
import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import useSignupStore from '@/hooks/useSignupStore.ts'
import SuccessIcon from '@/static/svg/auth/auth-checked-term-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
import Progress3 from '@/static/svg/auth/signup-progress3-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

interface SignupProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
function SignupId({ setStep }: SignupProps) {
  const [isIdAllowed, setIsIdAllowed] = useState<boolean>(false)
  const setUserId = useSignupStore((state) => state.setUserId)
  const userId = useSignupStore((state) => state.userId)

  const [errTxt, setErrTxt] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const lang = useLangStore((state) => state.lang)
  useEffect(() => {
    async function fetchData() {
      await publicAPI
        .get(`/user/userId?userId=${userId}`)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          setIsError(false)
          setErrTxt('')
          setIsIdAllowed(true)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('error', err)
          setIsError(true)
          setErrTxt(err.response.data.message)
          setIsIdAllowed(false)
        })
    }

    //조건 걸기 조건 만족 시 fetchData 실행
    if (userId.length < 2 || userId.length > 16) {
      setIsError(true)
      setErrTxt(AUTH_CONSTANT[lang]['signup-id-length'])
      setIsIdAllowed(false)
      return
    }

    if (!/^[a-zA-Z0-9-_]*$/.test(userId)) {
      setIsError(true)
      setErrTxt(AUTH_CONSTANT[lang]['signup-id-regex'])
      setIsIdAllowed(false)
      return
    }

    if (userId) {
      fetchData()
    }
  }, [userId, lang])

  const clickedXmark = () => {
    setUserId('')
    setIsIdAllowed(false)
    setIsError(false)
  }
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[10rem]" />
        <Progress3 className="w-[10.3125rem]" />
      </div>

      <div className="mb-10 w-full text-lg">
        {AUTH_CONSTANT[lang]['signup-id-txt1']}
      </div>

      {/* 아이디 입력   */}
      <div className="mb-60 flex flex-col justify-center gap-y-4 py-3">
        <label
          className="text-high text-xs-bold"
          htmlFor="id"
        >
          ID
        </label>
        <div className="relative flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
          <input
            id="id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 bg-transparent pr-12 outline-none placeholder:text-text-disabled"
            placeholder={AUTH_CONSTANT[lang]['id-placeholder']}
          />
          <div className="absolute right-0 mr-4 flex items-center gap-x-2">
            {isIdAllowed && <SuccessIcon />}

            {userId && (
              <button
                className="focus-visible:outline-primary"
                onClick={clickedXmark}
              >
                <XmarkIcon />
              </button>
            )}
          </div>
        </div>
        {isError && <p className="px-1 text-xs text-warning">{errTxt}</p>}
      </div>

      <button
        onClick={() => setStep(3)}
        disabled={!isIdAllowed}
        className={`${!isIdAllowed && '!bg-grey-50 text-text-disabled'} flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
      >
        {AUTH_CONSTANT[lang]['signup-lang-btn']}
      </button>
    </div>
  )
}

export default SignupId
