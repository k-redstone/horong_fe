'use client'
import React from 'react'

import { GUIDE_HOLIDAY_CONSTANT } from '@/constants/guide/holiday/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function HolidayPage() {
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
    <div className="flex min-h-screen flex-col bg-grey-80 p-4">
      <div className="sticky top-0 flex flex-col items-center">
        <h1 className="text-md font-bold text-text-high">
          {GUIDE_HOLIDAY_CONSTANT[lang]['guide-holiday']}
        </h1>
        <hr className="border-ffffff border-t-0.5 my-4 w-full opacity-15" />
      </div>

      <div className="mx-4 flex max-w-md flex-1 items-start justify-start">
        <p className="text-xs text-text-high">
          {lineBreaks(GUIDE_HOLIDAY_CONSTANT[lang]['guide-holiday-detail'])}
        </p>
      </div>
    </div>
  )
}

export default HolidayPage
