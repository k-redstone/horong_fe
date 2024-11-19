'use client'
import Image from 'next/image'
import React from 'react'

import { GUIDE_HOSPITAL_CONSTANT } from '@/constants/guide/hospital/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import InternationalHospitalIMG from '@/static/imgs/international-medical-center.png'

function HospitalPage() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-grey-80 p-4 pb-10">
      <div className="flex flex-col items-center">
        <h1 className="text-md font-bold text-text-high">
          {GUIDE_HOSPITAL_CONSTANT[lang]['guide-hospital']}
        </h1>
        <hr className="border-ffffff border-t-0.5 my-4 w-full opacity-15" />
      </div>

      <div className="mx-4 flex max-w-md flex-1 items-start justify-start">
        <Image
          src={InternationalHospitalIMG}
          alt="International Medical Center"
        />
      </div>
    </div>
  )
}

export default HospitalPage
