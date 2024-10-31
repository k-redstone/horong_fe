import Image from 'next/image'
import { useEffect, useState } from 'react'

import publicAPI from '@/api/publicAPI/index.ts'
import useSignupStore from '@/hooks/useSignupStore.ts'
import Progress3 from '@/static/imgs/signup-progress3-icon.png'
import SuccessIcon from '@/static/svg/auth/auth-checked-term-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
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

    if (userId) {
      fetchData()
    }
  }, [userId])

  const clickedXmark = () => {
    setUserId('')
    setIsIdAllowed(false)
    setIsError(false)
  }
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[8.25rem]" />
        <Image
          src={Progress3}
          alt="signup_progress3"
          className="w-[10.3125rem]"
        />
      </div>

      <div className="mb-10 w-full text-lg">ID를 설정해주세요.</div>

      {/* 아이디 입력   */}
      <div className="mb-60 flex flex-col justify-center gap-y-4 py-3">
        <label
          className="text-high text-xs-bold"
          htmlFor="id"
        >
          ID
        </label>
        <div className="flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
          <input
            id="id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
            placeholder={'ID를 입력해주세요'}
          />
          <div className="flex items-center gap-x-2">
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
        다음으로
      </button>
    </div>
  )
}

export default SignupId
