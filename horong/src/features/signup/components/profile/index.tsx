import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import publicAPI from '@/api/publicAPI/index.ts'
import useSignupStore from '@/hooks/useSignupStore.ts'
import Progress5 from '@/static/imgs/signup-progress5-icon.png'
import ProfileIcon from '@/static/svg/auth/auth-profile-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

function SignupProfile() {
  const nickname = useSignupStore((state) => state.nickname)
  const setNickname = useSignupStore((state) => state.setNickname)

  const [isError, setIsError] = useState<boolean | null>(null)
  const [errTxt, setErrTxt] = useState('')

  useEffect(() => {
    async function fetchData() {
      await publicAPI
        .get(`/user/nickname?nickname=${nickname}`)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          setIsError(false)
          setErrTxt('')
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('error', err)
          setIsError(true)
          setErrTxt(err.response.data.message)
        })
    }

    if (nickname) {
      fetchData()
    }
  }, [nickname])

  const router = useRouter()
  const submitSignup = () => {
    toast.success('회원가입이 완료되었습니다.')
    router.push('/signup/complete')
  }

  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[8.25rem]" />
        <Image
          src={Progress5}
          alt="signup_progress5"
          className="w-[10.3125rem]"
        />
      </div>
      <div className="mb-20 w-full text-lg">프로필을 설정해주세요.</div>

      {/* 닉네임 설정 컨테이너 */}
      <div className="mb-28 flex flex-col justify-center gap-y-4 py-3">
        <div className="flex w-full items-center justify-center">
          <ProfileIcon />
        </div>
        <label
          className="text-high text-xs-bold"
          htmlFor="nickname"
        >
          NICKNAME
        </label>
        <div className="flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
            placeholder={'닉네임을 입력해주세요'}
          />
          <div className="flex items-center gap-x-2">
            {nickname && (
              <button
                className="focus-visible:outline-primary"
                onClick={() => setNickname('')}
              >
                <XmarkIcon />
              </button>
            )}
          </div>
        </div>
        {isError || isError === null ? (
          <p className="px-1 text-xs text-warning">{errTxt}</p>
        ) : (
          <p className="px-1 text-xs text-primary">사용 가능한 닉네임입니다.</p>
        )}
      </div>

      <button
        onClick={submitSignup}
        disabled={isError === null || isError}
        className={`${(isError === null || isError) && '!bg-grey-50 text-text-disabled'} flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
      >
        가입하기
      </button>
    </div>
  )
}

export default SignupProfile
