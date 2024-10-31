import Image from 'next/image'
import { useEffect, useState } from 'react'

import Progress2 from '@/static/imgs/signup-progress2-icon.png'
import TermCheckedIcon from '@/static/svg/auth/auth-checked-term-icon.svg'
import TermUncheckedIcon from '@/static/svg/auth/auth-unchecked-term-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'
interface SignupProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
function SignupTerms({ setStep }: SignupProps) {
  const [allChecked, setAllChecked] = useState(false)
  const [serviceChecked, setServiceChecked] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)

  useEffect(() => {
    if (serviceChecked && privacyChecked && marketingChecked) {
      setAllChecked(true)
    }
  }, [serviceChecked, privacyChecked, marketingChecked])

  const checkAllTerms = (checked: boolean) => () => {
    if (checked) {
      setServiceChecked(false)
      setPrivacyChecked(false)
      setMarketingChecked(false)
    } else {
      setServiceChecked(true)
      setPrivacyChecked(true)
      setMarketingChecked(true)
    }
    setAllChecked(!checked)
  }
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[8.25rem]" />
        <Image
          src={Progress2}
          alt="signup_progress1"
          className="w-[10.3125rem]"
        />
      </div>

      <div className="mb-40 w-full text-lg">
        서비스 이용약관에 동의해주세요.
      </div>

      {/* 약관동의  */}

      <div className="mb-10 flex flex-col justify-center gap-y-4 py-5">
        <div className="flex items-center gap-x-4 font-semibold text-text-high">
          {allChecked ? (
            <TermCheckedIcon
              onClick={checkAllTerms(true)}
              className="h-6 w-6 cursor-pointer"
            />
          ) : (
            <TermUncheckedIcon
              onClick={checkAllTerms(false)}
              className="h-6 w-6 cursor-pointer"
            />
          )}
          <button onClick={checkAllTerms(allChecked)}>약관 전체동의</button>
        </div>
        <div className="border-t border-t-grey-10" />
        <div className="flex items-center gap-x-4">
          {serviceChecked ? (
            <TermCheckedIcon
              onClick={() => setServiceChecked(false)}
              className="h-6 w-6 cursor-pointer"
            />
          ) : (
            <TermUncheckedIcon
              onClick={() => setServiceChecked(true)}
              className="h-6 w-6 cursor-pointer"
            />
          )}
          <button onClick={() => setServiceChecked(!serviceChecked)}>
            서비스 이용약관 동의{' '}
            <i className="not-italic text-warning">(필수)</i>
          </button>
        </div>
        <div className="flex items-center gap-x-4">
          {privacyChecked ? (
            <TermCheckedIcon
              onClick={() => setPrivacyChecked(false)}
              className="h-6 w-6 cursor-pointer"
            />
          ) : (
            <TermUncheckedIcon
              onClick={() => setPrivacyChecked(true)}
              className="h-6 w-6 cursor-pointer"
            />
          )}
          <button onClick={() => setPrivacyChecked(!privacyChecked)}>
            개인정보 수집 및 이용동의{' '}
            <i className="not-italic text-warning">(필수)</i>
          </button>
        </div>
        <div className="flex items-center gap-x-4">
          {marketingChecked ? (
            <TermCheckedIcon
              onClick={() => setMarketingChecked(false)}
              className="h-6 w-6 cursor-pointer"
            />
          ) : (
            <TermUncheckedIcon
              onClick={() => setMarketingChecked(true)}
              className="h-6 w-6 cursor-pointer"
            />
          )}
          <button onClick={() => setMarketingChecked(!marketingChecked)}>
            위치 정보 이용 동의{' '}
            <i className="not-italic text-text-disabled">(선택)</i>
          </button>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!serviceChecked || !privacyChecked}
        className={`${(!serviceChecked || !privacyChecked) && '!bg-grey-50 text-text-disabled'} flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100`}
      >
        다음으로
      </button>
    </div>
  )
}

export default SignupTerms
