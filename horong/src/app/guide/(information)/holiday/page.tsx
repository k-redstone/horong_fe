'use client'
import React from 'react'

function HolidayPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 p-4">
      <div className="sticky top-0 flex flex-col items-center bg-gray-900 p-4">
        <h1 className="mb-2 text-3xl font-bold text-primary">공휴일</h1>
        <hr className="mb-4 w-full border-t-2 border-primary" />
      </div>

      <div className="mx-auto flex max-w-md flex-1 items-start justify-start">
        <p className="text-lg text-gray-300">
          한국의 공휴일은 다양한 문화와 전통을 반영하여 국가적으로 지정된
          날들입니다. 주요 공휴일에는 설날, 추석, 어린이날 등이 있으며, 각
          공휴일은 지역과 전통에 따라 다양한 행사가 열립니다.
        </p>
      </div>
    </div>
  )
}

export default HolidayPage
