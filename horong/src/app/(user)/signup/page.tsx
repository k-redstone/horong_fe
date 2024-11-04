'use client'

import { useState } from 'react'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { AUTH_CONSTANT } from '@/constants/auth/index.ts'
import SignupLanguage from '@/features/signup/components/language/index.tsx'
import SignupPassword from '@/features/signup/components/password/index.tsx'
import SignupProfile from '@/features/signup/components/profile/index.tsx'
import SignupTerms from '@/features/signup/components/terms/index.tsx'
import SignupId from '@/features/signup/components/userid/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

function Signup() {
  const [step, setStep] = useState(0)
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex w-full flex-col">
      {/* 글로벌헤더  */}
      <GlobalHeader pageName={AUTH_CONSTANT[lang]['signup-header']} />

      <div className="overflow-y-scroll pb-4">
        {step === 0 && <SignupLanguage setStep={setStep} />}
        {step === 1 && <SignupTerms setStep={setStep} />}
        {step === 2 && <SignupId setStep={setStep} />}
        {step === 3 && <SignupPassword setStep={setStep} />}
        {step === 4 && <SignupProfile />}
      </div>
    </div>
  )
}

export default Signup
