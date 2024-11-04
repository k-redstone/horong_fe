'use client'

import Link from 'next/link'

import { MAIN_CONSTANT } from '@/constants/main/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

export default function NotFound() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex flex-col items-center justify-center text-3xl font-bold">
      <p>404!</p>
      <p className="text-xs font-normal">{MAIN_CONSTANT[lang]['404-title']}</p>

      <Link
        href={'/'}
        className="my-12 rounded-md border border-white px-12 py-4 text-xs-bold transition duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        {MAIN_CONSTANT[lang]['404-btn']}
      </Link>
    </div>
  )
}
