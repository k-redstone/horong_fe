'use client'
import React from 'react'

import { GUIDE_VISA_CONSTANT } from '@/constants/guide/visa/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function VisaPage() {
  const lang = useLangStore((state) => state.lang)

  // 줄바꿈 처리 함수
  const lineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-grey-80 p-4 pb-10">
      <div className="flex flex-col items-center">
        <h1 className="text-md font-bold text-text-high">
          {GUIDE_VISA_CONSTANT[lang]['guide-visa']}
        </h1>
        <hr className="border-ffffff border-t-0.5 my-4 w-full opacity-15" />
      </div>

      <div className="mx-4 flex max-w-md flex-1 items-start justify-start">
        <p className="text-xs text-text-high">
          {lineBreaks(GUIDE_VISA_CONSTANT[lang]['guide-visa-detail'])}
        </p>
      </div>
    </div>
  )
}

export default VisaPage
