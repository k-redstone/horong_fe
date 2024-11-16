import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import publicAPI from '@/api/publicAPI/index.ts'
import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import useSignupStore from '@/hooks/useSignupStore.ts'
import ProfileIcon from '@/static/svg/auth/auth-profile-icon.svg'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
import Progress5 from '@/static/svg/auth/signup-progress5-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

function SignupProfile() {
  const nickname = useSignupStore((state) => state.nickname)
  const setNickname = useSignupStore((state) => state.setNickname)

  const [isError, setIsError] = useState<boolean | null>(null)
  const [errTxt, setErrTxt] = useState('')

  const lang = useLangStore((state) => state.lang)
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

  //회원정보
  const userId = useSignupStore((state) => state.userId)
  const password = useSignupStore((state) => state.password)
  const language = useSignupStore((state) => state.language)
  const router = useRouter()

  const postSignup = async () => {
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('password', password)
    formData.append('nickname', nickname)
    formData.append('language', language)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    await publicAPI.post('/user/signup', formData, config)
  }
  const submitSignup = () => {
    toast.promise(postSignup(), {
      loading: AUTH_CONSTANT[lang]['signup-complete-toast-load'],
      success: (data) => {
        // eslint-disable-next-line no-console
        console.log(data)
        localStorage.removeItem('signupState')
        router.push('/signup/complete')
        return AUTH_CONSTANT[lang]['signup-complete-toast-success']
      },
      error: (err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        return AUTH_CONSTANT[lang]['signup-complete-toast-fail']
      },
    })
  }

  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[10rem]" />
        <Progress5 className="w-[10.3125rem]" />
      </div>
      <div className="mb-20 w-full text-lg">
        {AUTH_CONSTANT[lang]['signup-profile-txt1']}
      </div>

      {/* 닉네임 설정 컨테이너 */}
      <div className="mb-28 flex flex-col justify-center gap-y-4 py-3">
        <div className="flex w-full items-center justify-center">
          <button
            className="rounded-full"
            onClick={() =>
              toast(AUTH_CONSTANT[lang]['signup-profile-click-toast'], {
                icon: '🙏',
                style: {
                  borderRadius: '12px',
                  background: '#ACBEFF',
                  color: '#090A0C',
                },
              })
            }
          >
            <ProfileIcon />
          </button>
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
            placeholder={AUTH_CONSTANT[lang]['signup-nickname-placeholder']}
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
          <p className="px-1 text-xs text-primary">
            {AUTH_CONSTANT[lang]['signup-nickname-success']}
          </p>
        )}
      </div>

      <button
        onClick={submitSignup}
        disabled={isError === null || isError}
        className={`${(isError === null || isError) && '!bg-grey-50 text-text-disabled'} flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
      >
        {AUTH_CONSTANT[lang]['signup-complete-btn']}
      </button>
    </div>
  )
}

export default SignupProfile
