'use client'

import { useRouter } from 'next/navigation'

import BackIconSVG from '@/static/svg/common/common-back-icon.svg'
import SidebaIconSvg from '@/static/svg/common/common-sidebar-icon.svg'

interface GlobalHeaderProps {
  pageName: string
}

function GlobalHeader({ pageName }: GlobalHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-between px-5 py-4">
      <button
        type="button"
        className="px-1 py-0.5"
        onClick={() => router.back()}
      >
        <BackIconSVG />
      </button>
      <p className="font-bold">
        <span>{pageName}</span>
      </p>
      {/* todo: 사이드바 만들기 */}
      <div className="px-2 py-[.1875rem]">
        <SidebaIconSvg />
      </div>
    </div>
  )
}

export default GlobalHeader
