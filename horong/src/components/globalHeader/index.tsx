'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import BackIconSVG from '@/static/svg/common/common-back-icon.svg'
import SidebaIconSvg from '@/static/svg/common/common-sidebar-icon.svg'

interface GlobalHeaderProps {
  pageName: string
}

function GlobalHeader({ pageName }: GlobalHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="relative flex w-full items-center justify-between bg-grey-90 px-5 py-4">
      <button
        type="button"
        className="px-1 py-0.5"
        onClick={() => router.back()}
      >
        <BackIconSVG />
      </button>
      <p className="absolute left-1/2 -translate-x-1/2 transform font-bold">
        <span>{pageName}</span>
      </p>
      {/* todo: 사이드바 만들기 */}

      {pathname !== '/signup' && (
        <Link
          href="/sidebar"
          className="px-2 py-[.1875rem]"
        >
          <SidebaIconSvg />
        </Link>
      )}
    </div>
  )
}

export default GlobalHeader
