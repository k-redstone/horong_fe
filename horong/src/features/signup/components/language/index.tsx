import Image from 'next/image'

import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import LanguageRadioBtn from '@/features/signup/components/language/radio/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
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
  const lang = useLangStore((state) => state.lang)
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
      <div className="mb-20 h-20 w-full text-lg">
        {AUTH_CONSTANT[lang]['signup-lang-txt1']}
        <br />
        {AUTH_CONSTANT[lang]['signup-lang-txt2']}
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
          {AUTH_CONSTANT[lang]['signup-lang-radio1']}
        </LanguageRadioBtn>
        <LanguageRadioBtn
          className={`${language === 'KOREAN' && 'border-primary'}`}
          language="KOREAN"
        >
          {language === 'KOREAN' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
          {AUTH_CONSTANT[lang]['signup-lang-radio2']}
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
          {AUTH_CONSTANT[lang]['signup-lang-radio3']}
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
          {AUTH_CONSTANT[lang]['signup-lang-radio4']}
        </LanguageRadioBtn>
      </div>

      <button
        onClick={() => setStep(1)}
        className="flex items-center justify-center rounded-xl bg-primary py-3 text-md font-bold text-grey-100"
      >
        {AUTH_CONSTANT[lang]['signup-lang-btn']}
      </button>
    </div>
  )
}

export default SignupLanguage
