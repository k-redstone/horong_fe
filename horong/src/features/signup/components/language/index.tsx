import Image from 'next/image'

import LanguageRadioBtn from '@/features/signup/components/language/radio/index.tsx'
import useSignupStore from '@/hooks/useSignupStore.ts'
import Progress1 from '@/static/imgs/signup-progress1-icon.png'
import RadioCheckedIcon from '@/static/svg/auth/auth-checked-radio-icon.svg'
import RadioUnCheckdIcon from '@/static/svg/auth/auth-unchecked-radio-icon.svg'
import LogoTxtIcon from '@/static/svg/logo-text-icon.svg'

interface SignupProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
function SignupLanguage({ setStep }: SignupProps) {
  const language = useSignupStore((state) => state.language)
  return (
    <div className="flex w-full flex-col px-6 pt-10">
      <div className="mb-10 flex flex-col gap-y-6">
        <LogoTxtIcon className="w-[8.25rem]" />
        <Image
          src={Progress1}
          alt="signup_progress1"
          className="w-[10.3125rem]"
        />
      </div>
      <div className="mb-20 w-full text-lg">
        안녕하세요, 호롱입니다!
        <br />
        서비스 내에서 사용할 언어를 선택해주세요.
      </div>

      {/* 언어선택 라디오버튼 */}
      <div className="mb-10 flex flex-col justify-center gap-y-4 py-3">
        <LanguageRadioBtn
          className={`${language === 'ENGLISH' && 'border-primary'}`}
          language="ENGLISH"
        >
          {language === 'ENGLISH' ? (
            <RadioCheckedIcon />
          ) : (
            <RadioUnCheckdIcon />
          )}
          영어
        </LanguageRadioBtn>
        <LanguageRadioBtn
          className={`${language === 'KOREAN' && 'border-primary'}`}
          language="KOREAN"
        >
          {language === 'KOREAN' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
          한국어
        </LanguageRadioBtn>
        <LanguageRadioBtn
          className={`${language === 'CHINESE' && 'border-primary'}`}
          language="CHINESE"
        >
          {language === 'CHINESE' ? (
            <RadioCheckedIcon />
          ) : (
            <RadioUnCheckdIcon />
          )}
          중국어
        </LanguageRadioBtn>
        <LanguageRadioBtn
          className={`${language === 'JAPANESE' && 'border-primary'}`}
          language="JAPANESE"
        >
          {language === 'JAPANESE' ? (
            <RadioCheckedIcon />
          ) : (
            <RadioUnCheckdIcon />
          )}
          일본어
        </LanguageRadioBtn>
      </div>

      <button
        onClick={() => setStep(1)}
        className="flex items-center justify-center rounded-xl bg-primary py-3 text-md text-grey-100"
      >
        다음으로
      </button>
    </div>
  )
}

export default SignupLanguage
